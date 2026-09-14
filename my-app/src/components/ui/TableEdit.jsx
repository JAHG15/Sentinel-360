import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function TableEdit({ onEdit }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        icon={<EditOutlined />}
        size="small"
        onClick={onEdit}
      >
        Editar
      </Button>
    </div>
  );
}
