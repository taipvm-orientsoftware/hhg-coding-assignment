import { Box, Button, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconBallpen, IconMail, IconUser } from '@tabler/icons';

interface EmployeeAdditionFormProps<T> {
  form: UseFormReturnType<T>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  loading?: boolean | undefined;
}

export default function EmployeeAdditionForm<T>({ form, onSubmit, loading }: EmployeeAdditionFormProps<T>) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TextInput required label="Employee name" icon={<IconUser size={20} />} {...form.getInputProps('name')} />
      <TextInput required label="Email" icon={<IconMail size={20} />} {...form.getInputProps('email')} />
      <TextInput required label="Position" icon={<IconBallpen size={20} />} {...form.getInputProps('position')} />
      <Button type="submit" sx={{ alignSelf: 'flex-end' }} mt="sm" loading={loading}>
        Submit
      </Button>
    </Box>
  );
}
