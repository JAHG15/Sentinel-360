import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Space, Switch, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import ModalForm from '../components/ui/ModalForm';
import TableEdit from '../components/ui/TableEdit.jsx';
import { AuthContext } from '../contexts/AuthContext';
import useModal from '../hooks/useModal';
import { createUsuario, getUsuarios, updateUsuario } from '../services/usuarios';

const { Option } = Select;

export default function Usuarios() {
  const { user, token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const { visible, open, close } = useModal();
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    setLoading(true);
    try {
      const usuarios = await getUsuarios(token);
      setData(usuarios);
      setFilteredData(usuarios);
    } catch (err) {
      console.error(err);
      messageApi.error('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some(
          (field) =>
            field &&
            field.toString().toLowerCase().includes(value)
        )
      )
    );
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Apellido Paterno', dataIndex: 'apellido_paterno', key: 'apellido_paterno' },
    { title: 'Apellido Materno', dataIndex: 'apellido_materno', key: 'apellido_materno' },
    { title: 'Correo', dataIndex: 'correo', key: 'correo' },
    { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
    { title: 'Rol', dataIndex: 'rol', key: 'rol' },
    {
      title: 'Estatus',
      dataIndex: 'estatus',
      key: 'estatus',
      render: (_, record) => (record.estatus === 1 ? 'Activo' : 'Inactivo'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) =>
        user?.rol === 'admin' ? (
          <TableEdit
            onEdit={() => {
              setEditing(record);
              open();
            }}
          />
        ) : null,
    },
  ];

  const handleCreate = async (values) => {
    setConfirmLoading(true);
    try {
      const newUsuario = await createUsuario(token, values);
      setData((prev) => [newUsuario, ...prev]);
      setFilteredData((prev) => [newUsuario, ...prev]);
      messageApi.success('Usuario creado');
      close();
    } catch (err) {
      console.error(err);
      messageApi.error('Error al crear usuario');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    setConfirmLoading(true);
    try {
      const updated = await updateUsuario(token, editing.id, values);
      setData((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setFilteredData((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      messageApi.success('Usuario actualizado');
      setEditing(null);
      close();
    } catch (err) {
      console.error(err);
      messageApi.error('Error al actualizar usuario');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Card
      title="Usuarios"
      extra={
        <Space>
          {user?.rol === 'admin' && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditing(null);
                open();
              }}
            >
              Agregar
            </Button>
          )}
          <Button
            type="default"
            icon={<FileTextOutlined />}
            style={{ backgroundColor: '#1890ff', color: '#fff' }}
            onClick={() => window.open('https://drive.google.com/drive/folders/1PO3iXG8X8AroJCqS8GW4VaFus8pRbCAT?usp=sharing', '_blank')}
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
        pagination={{ pageSize: 3 }} // Solo 4 registros por página
      />

      <ModalForm
        visible={visible}
        onCancel={() => {
          setEditing(null);
          close();
        }}
        onOk={editing ? handleUpdate : handleCreate}
        initialValues={editing || {}}
        title={editing ? 'Actualizar usuario' : 'Agregar usuario'}
        confirmLoading={confirmLoading}
      >
        {/* Campos para crear usuario */}
        {!editing && (
          <>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Ingresa el nombre' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Paterno" name="apellido_paterno" rules={[{ required: true, message: 'Ingresa el apellido paterno' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Materno" name="apellido_materno" rules={[{ required: true, message: 'Ingresa el apellido materno' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Correo" name="correo" rules={[{ required: true, message: 'Ingresa el correo' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Ingresa la contraseña' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: 'Ingresa el teléfono' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Rol" name="rol" rules={[{ required: true, message: 'Ingresa el rol' }]}>
              <Select>
                <Option value="admin">admin</Option>
                <Option value="usuario">usuario</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Estatus" name="estatus" valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        )}

        {/* Campos para editar usuario */}
        {editing && (
          <>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Ingresa el nombre' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Paterno" name="apellido_paterno" rules={[{ required: true, message: 'Ingresa el apellido paterno' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Materno" name="apellido_materno">
              <Input />
            </Form.Item>
            <Form.Item label="Correo" name="correo" rules={[{ required: true, message: 'Ingresa el correo' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Contraseña" name="password">
              <Input.Password placeholder="Dejar vacío para no cambiar" />
            </Form.Item>
            <Form.Item label="Teléfono" name="telefono">
              <Input />
            </Form.Item>
            <Form.Item label="Rol" name="rol">
              <Select>
                <Option value="admin">admin</Option>
                <Option value="usuario">usuario</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Estatus" name="estatus" valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        )}
      </ModalForm>
    </Card>
  );
}
