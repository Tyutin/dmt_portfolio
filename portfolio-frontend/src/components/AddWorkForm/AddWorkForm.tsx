"use client";
import { addWorkAction } from "@/actions";
import { UploadOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Form, Input, Upload } from "antd";
import type { UploadFile } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddWorkFormProps = {
  userId: string;
};

export default function AddWorkForm({ userId }: AddWorkFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter()
  const onFinish = async (values: any) => {
    setIsFetching(true);
    const data = new FormData();
    data.append("file", values.upload[0].originFileObj);
    const response = await fetch("/api/images", { method: "POST", body: data });
    const otvet = await response.json();
    await addWorkAction(userId, values.title, otvet.imageName);
    router.push('/profile')
  };
  return (
    <AntdRegistry>
      <Form
        name="UpdateProfileForm"
        onFinish={onFinish}
        disabled={isFetching}
        layout="vertical"
      >
        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            onChange={(e) => {
              setFileList(e.fileList);
            }}
            listType="picture"
            multiple={false}
            accept="image/png, image/jpeg"
          >
            {!fileList.length && (
              <Button icon={<UploadOutlined />}>Выбрать файл</Button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Название"
          name="title"
          rules={[
            {
              required: true,
              message: "Введите название вашей работы",
              min: 2,
            },
          ]}
        >
          <Input type="text" maxLength={60} style={{ maxWidth: "400px" }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Загрузить</Button>
        </Form.Item>
      </Form>
    </AntdRegistry>
  );
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
