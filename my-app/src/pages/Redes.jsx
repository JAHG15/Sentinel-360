import { FileTextOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Space, Table, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ModalForm from '../components/ui/ModalForm'
import TableActions from '../components/ui/TableActions'
import { AuthContext } from '../contexts/AuthContext'
import useModal from '../hooks/useModal'

export default function Redes() {
  const { user, token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const { visible, open, close } = useModal()
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // Message API
  const [messageApi, contextHolder] = message.useMessage()

  // Cargar redes
  const loadRedes = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/idf', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      if (!res.ok) throw new Error('Error al cargar redes')
      const redes = await res.json()
      setData(redes)
      setFilteredData(redes)
    } catch (err) {
      console.error(err)
      messageApi.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRedes()
  }, [])

  // 🔍 Filtrado de búsqueda por todos los campos
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch(value)

    const filtered = data.filter((item) =>
      Object.values(item)
        .filter((v) => v !== null && v !== undefined)
        .some((val) => val.toString().toLowerCase().includes(value))
    )

    setFilteredData(filtered)
  }

  // Columnas
  let columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Equipo', dataIndex: 'equipo', key: 'equipo' },
    { title: 'IP', dataIndex: 'ip', key: 'ip' },
    { title: 'Ubicación', dataIndex: 'ubicacion', key: 'ubicacion' },
    {
      title: 'Configuración',
      dataIndex: 'url',
      key: 'url',
      render: (text) =>
        text ? (
          <Button
            type="link"
            onClick={() => window.open(text, '_blank')}
            style={{ padding: 0 }}
          >
            Ver archivo
          </Button>
        ) : (
          'Sin archivo'
        ),
    },
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
                const res = await fetch(`http://127.0.0.1:8000/api/idf/${record.id}`, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                  },
                })
                if (!res.ok) throw new Error('No se pudo eliminar')
                setData((d) => d.filter((x) => x.id !== record.id))
                setFilteredData((f) => f.filter((x) => x.id !== record.id))
                messageApi.success('Dispositivo eliminado')
              } catch (err) {
                console.error(err)
                messageApi.error(err.message)
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

  // Crear nueva red
  const handleCreate = async (values) => {
    setConfirmLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/idf', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, estatus: true }),
      })
      if (!res.ok) throw new Error('Error al agregar dispositivo')
      const newRed = await res.json()
      setData((prev) => [newRed, ...prev])
      setFilteredData((prev) => [newRed, ...prev])
      messageApi.success('Dispositivo agregado con éxito')
      close()
    } catch (err) {
      console.error(err)
      messageApi.error(err.message)
    } finally {
      setConfirmLoading(false)
    }
  }

  // Actualizar red
  const handleUpdate = async (values) => {
    setConfirmLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/idf/${editing.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Error al actualizar')
      const updated = await res.json()
      setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      setFilteredData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      messageApi.success('Dispositivo actualizado')
      setEditing(null)
      close()
    } catch (err) {
      console.error(err)
      messageApi.error(err.message)
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <Card
      title="IDF(S)"
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
        title={editing ? 'Actualizar red' : 'Agregar red'}
        confirmLoading={confirmLoading}
      >
        <Form.Item label="Equipo" name="equipo" rules={[{ required: true, message: 'Ingresa el equipo' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="IP" name="ip" rules={[{ required: true, message: 'Ingresa la IP' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Ubicación" name="ubicacion" rules={[{ required: true, message: 'Ingresa la ubicación' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Configuración" name="url" rules={[{ type: 'url', message: 'Ingresa una URL válida' }]}>
          <Input />
        </Form.Item>
      </ModalForm>
    </Card>
  )
}
