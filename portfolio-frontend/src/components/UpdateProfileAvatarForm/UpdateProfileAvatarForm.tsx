"use client";
import { updateProfileImageAction } from "@/actions";
import { UploadOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Form, Input, Upload } from "antd";
import type { UploadFile } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UpdateProfileAvatarFormProps = {
  userId: string;
  redirectLink?: string
};

export default function UpdateProfileAvatarForm({
  userId,
  redirectLink = '/profile'
}: UpdateProfileAvatarFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const onFinish = async (values: any) => {
    setIsFetching(true);
    const data = new FormData();
    data.append("file", values.upload[0].originFileObj);
    const response = await fetch("/api/avatars", {
      method: "POST",
      body: data,
    });
    const otvet = await response.json();
    await updateProfileImageAction(userId, otvet.imageName);
    router.push(redirectLink);
  };
  return (
    <AntdRegistry>
      <Form
        name="UpdateProfileForm"
        onFinish={onFinish}
        disabled={isFetching}
        layout="vertical"
      >
        <Form.Item>
          <p style={{fontSize: '24px', fontWeight: '600'}}>Обновить фотографию профиля</p>
        </Form.Item>
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
        <Form.Item>
          <Button htmlType="submit">Обновить</Button>
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
