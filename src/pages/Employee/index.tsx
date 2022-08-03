import { GoBackButton } from '../../components';

export default function Employee(): JSX.Element {
  /** useState */
  // const [toggleAdditionEmployeeForm, setToggleAdditionEmployeeForm] = useState<boolean>(false);
  // const [effect, setEffect] = useState<number>(0);

  // const [additionEmployeeForm] = Form.useForm();

  /** custom hooks */
  // const { pagination, changeCurrentPage, resetPagination } = usePagination();
  // const { isLoading, data, total, getData } = useGetRequest(getEmployeesAPI);
  // const { postData } = usePostRequest(addEmployeeAPI);

  // const handleTableChange = useCallback(
  //   ({ current }: { current: number }) => changeCurrentPage(current),
  //   [changeCurrentPage]
  // );

  // const handleToggleAdditionEmployeeForm = useCallback(() => {
  //   setToggleAdditionEmployeeForm(toggle => !toggle);
  // }, []);

  // const handleSubmitForm = useCallback(
  //   (data: IAddEmployeeData) => {
  //     postData(data);
  //     additionEmployeeForm.resetFields();
  //     resetPagination();
  //     setToggleAdditionEmployeeForm(false);
  //     setEffect(effect => {
  //       return effect + 1;
  //     });
  //   },
  //   [postData, resetPagination, additionEmployeeForm]
  // );

  /** useEffect */
  // useEffect(() => {
  //   const params = { ...pagination };
  //   getData(params);
  // }, [getData, pagination, effect]);

  return (
    <div className="employee-page">
      <header className="employee-page__header">
        <GoBackButton />
        <h1 className="employee-page__heading">Employee Management</h1>
      </header>
      <main className="employee-page__container">
        {/* <Button className="employee-page__btn--add" type="primary" onClick={handleToggleAdditionEmployeeForm}>
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
          dataSource={data}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: DEFAULT_PAGE_LIMIT,
            total,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
          // onChange={handleTableChange}
          rowKey="id"
          bordered
        /> */}
      </main>
    </div>
  );
}
