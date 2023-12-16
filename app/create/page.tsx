'use client';
import { Box, Button, Text, TextInput, Textarea } from '@mantine/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const CreateRecipe: React.FC = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageURL: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      description: Yup.string().required('Required'),
      imageURL: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await fetch('/api/recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Box mt={20} mx='lg' className='px-10'>
      <form onSubmit={formik.handleSubmit}>
        <Text fw={700} mb={10} size='xl'>
          New Recipe
        </Text>
        <TextInput
          mb={10}
          id='name'
          label='Name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <TextInput
          mb={10}
          id='imageURL'
          label='Image URL'
          name='imageURL'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <div>{formik.errors.imageURL}</div>
        ) : null}

        <Textarea
          mb={10}
          id='description'
          label='Description'
          name='description'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  );
};

export default CreateRecipe;
