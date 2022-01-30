import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { GoBackButton } from '../../components';
import { DEFAULT_PAGE_LIMIT } from '../../constants';
import { useGetEmployees, usePagination, usePostEmployee } from '../../hooks';
import { IAddEmployeeData } from '../../interfaces';
import columns from './columns';
import { AdditionEmployeeForm } from './components';

export default function Employee(): JSX.Element {
  /** useState */
  const [toggleAdditionEmployeeForm, setToggleAdditionEmployeeForm] =
    useState<boolean>(false);
  const [effect, setEffect] = useState<number>(0);

  const [additionEmployeeForm] = Form.useForm();

  /** custom hooks */
  const { pagination, changeCurrentPage, resetPagination } = usePagination();
  const { isLoading, employees, total, getEmployees } = useGetEmployees();
  const { postEmployee } = usePostEmployee();

  const handleTableChange = useCallback(
    ({ current }) => changeCurrentPage(current),
    [changeCurrentPage]
  );

  const handleToggleAdditionEmployeeForm = useCallback(() => {
    setToggleAdditionEmployeeForm(toggle => !toggle);
  }, []);

  const handleSubmitForm = useCallback(
    (data: IAddEmployeeData) => {
      postEmployee(data);
      additionEmployeeForm.resetFields();
      resetPagination();
      setToggleAdditionEmployeeForm(false);
      setEffect(effect => effect + 1);
    },
    [postEmployee, resetPagination, additionEmployeeForm]
  );

  /** useEffect */
  useEffect(() => {
    const params = { ...pagination };
    getEmployees(params);
  }, [getEmployees, pagination, effect]);

  return (
    <div className="employee-page">
      <header className="employee-page__header">
        <GoBackButton />
        <h1 className="employee-page__heading">Employee Management</h1>
      </header>
      <main className="employee-page__container">
        <Button
          className="employee-page__btn--add"
          type="primary"
          onClick={handleToggleAdditionEmployeeForm}
        >
          <PlusOutlined /> Add new
        </Button>
        <AdditionEmployeeForm
          form={additionEmployeeForm}
          visible={toggleAdditionEmployeeForm}
          onSubmit={handleSubmitForm}
          onClose={handleToggleAdditionEmployeeForm}
        />
        <Table
          className="employee-page__table"
          columns={columns}
          dataSource={employees}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: DEFAULT_PAGE_LIMIT,
            total,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          rowKey="id"
          bordered
        />
      </main>
    </div>
  );
}
