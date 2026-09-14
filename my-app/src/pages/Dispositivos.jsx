import { FileTextOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Space, Table, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ModalForm from '../components/ui/ModalForm'
import TableActions from '../components/ui/TableActions'
import { AuthContext } from '../contexts/AuthContext'
import useModal from '../hooks/useModal'
import {
  createDispositivo,
  deleteDispositivo,
  getDispositivos,
  updateDispositivo,
} from '../services/dispositivos'

export default function Dispositivos() {
  const { user, token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const { visible, open, close } = useModal()
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const dispositivos = await getDispositivos(token)
      setData(dispositivos)
      setFilteredData(dispositivos)
    } catch (err) {
      console.error(err)
      messageApi.error('Error al cargar los dispositivos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    const filtered = data.filter(
      (item) =>
        item.equipo.toLowerCase().includes(value.toLowerCase()) ||
        item.ip.toLowerCase().includes(value.toLowerCase()) ||
        item.mac.toLowerCase().includes(value.toLowerCase()) ||
        String(item.idf).includes(value) ||
        (item.puerto ? String(item.puerto).includes(value) : false)
    )
    setFilteredData(filtered)
  }

  // Columnas
  let columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Equipo', dataIndex: 'equipo', key: 'equipo' },
    { title: 'IP', dataIndex: 'ip', key: 'ip' },
    { title: 'MAC', dataIndex: 'mac', key: 'mac' },
    { title: 'IDF', dataIndex: 'idf', key: 'idf' },
    { title: 'Puerto', dataIndex: 'puerto', key: 'puerto' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) =>
        user?.rol === 'admin' ? (
          <TableActions
            onEdit={() => {
              setEditing(record)
              open()
            }}
            onDelete={async () => {
              try {
                await deleteDispositivo(token, record.id)
                messageApi.success('Se eliminó con éxito')
                loadData()
              } catch (err) {
                console.error(err)
                messageApi.error('Error al eliminar el dispositivo')
              }
            }}
          />
        ) : null,
    },
  ]

  // Filtrar columna de acciones si no es admin
  if (user?.rol !== 'admin') {
    columns = columns.filter((col) => col.key !== 'acciones')
  }

  const handleCreate = async (values) => {
    setConfirmLoading(true)
    try {
      await createDispositivo(token, values)
      messageApi.success('Se agregó con éxito')
      close()
      await loadData()
    } catch (err) {
      console.error(err)
      messageApi.error('Error al agregar dispositivo')
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleUpdate = async (values) => {
    setConfirmLoading(true)
    try {
      await updateDispositivo(token, editing.id, values)
      messageApi.success('Se actualizó con éxito')
      setEditing(null)
      close()
      await loadData()
    } catch (err) {
      console.error(err)
      messageApi.error('Error al actualizar dispositivo')
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <Card
      title="Dispositivos"
      extra={
        <Space>
          {user?.rol === 'admin' && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditing(null)
                open()
              }}
            >
              Agregar
            </Button>
          )}
          <Button
            type="default"
            icon={<FileTextOutlined />}
            style={{ backgroundColor: '#1890ff', color: '#fff' }}
            onClick={() =>
              window.open(
                'https://drive.google.com/drive/folders/1PO3iXG8X8AroJCqS8GW4VaFus8pRbCAT?usp=sharing',
                '_blank'
              )
            }
          >
            Manuales
          </Button>
        </Space>
      }
    >
      {contextHolder}
      <Input
        placeholder="Buscar..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: '50%' }}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 3 }}
      />

      <ModalForm
        visible={visible}
        onCancel={() => {
          setEditing(null)
          close()
        }}
        onOk={editing ? handleUpdate : handleCreate}
        initialValues={editing || {}}
        title={editing ? 'Actualizar dispositivo' : 'Agregar dispositivo'}
        confirmLoading={confirmLoading}
      >
        <Form.Item
          label="Equipo"
          name="equipo"
          rules={[{ required: true, message: 'Ingresa el equipo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="IP"
          name="ip"
          rules={[{ required: true, message: 'Ingresa la IP' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MAC"
          name="mac"
          rules={[{ required: true, message: 'Ingresa la dirección MAC' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="IDF"
          name="idf"
          rules={[{ required: true, message: 'Ingresa el IDF' }]}
        >
          <Input />
        </Form.Item>
        {/* 🔹 Campo puerto modificado para aceptar letras y números */}
        <Form.Item label="Puerto" name="puerto">
          <Input />
        </Form.Item>
      </ModalForm>
    </Card>
  )
}
