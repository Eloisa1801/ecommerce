import { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import CategoryForm from './CategoryForm';
import axios from 'axios';
import { title } from 'process';
import moment from 'moment';
function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/category');
      setCategories(res.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descript',
      dataIndex: 'descript',
      key: 'descript',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (createdAt: string) => moment(createdAt).format('DD MM YYYY'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setShowCategoryForm(true);
          }}
        >
          Add Category
        </Button>
      </div>
      <div className="mt-5">
        <Table
          dataSource={categories}
          columns={columns}
          loading={loading}
          pagination={false}
        ></Table>
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          reloadData={() => {}}
        ></CategoryForm>
      )}
    </div>
  );
}
export default CategoriesList;
