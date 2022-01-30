import { Button, Form, FormInstance, Input, Modal } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

interface AdditionEmployeeFormProps {
  form: FormInstance;
  visible: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function AdditionEmployeeForm({
  form,
  visible,
  onSubmit,
  onClose,
}: AdditionEmployeeFormProps): JSX.Element {
  return (
    <Modal
      title="ADD NEW EMPLOYEE"
      className="employees__modal"
      centered
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{ name: '', email: '', position: '' }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: 'email', message: 'Email is required' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: 'Position is required' }]}
        >
          <Input placeholder="Posititon" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
