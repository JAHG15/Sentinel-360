import { Form, Modal } from 'antd'
import { useEffect } from 'react'

export default function ModalForm({
  visible,
  onCancel,
  onOk,
  initialValues = {},
  title,
  children,
  confirmLoading = false,
}) {
  const [form] = Form.useForm()

  // Setear valores cuando cambian, o limpiar si es un nuevo registro
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form, visible])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      // Esperamos a que onOk termine para que confirmLoading funcione
      await onOk(values)
      form.resetFields()
    } catch {
      // validación fallida, no hacemos nada
    }
  }

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Modal>
  )
}

ModalForm.FormItem = Form.Item
