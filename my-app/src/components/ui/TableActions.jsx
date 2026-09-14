import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

export default function TableActions({ onEdit, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button icon={<EditOutlined />} size="small" onClick={onEdit} />
      <Popconfirm title="¿Eliminar?" onConfirm={onDelete}>
        <Button danger icon={<DeleteOutlined />} size="small" />
      </Popconfirm>
    </div>
  )
}
