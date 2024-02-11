"use client";
import { Alert, Form, Input } from "antd";
import { useState } from "react";
import "./UpdateProfileForm.scss";
import Button from "../Button/Button";
import { ProfileType } from "../../../../typeorm/src/entities/types/profileType";
import { updateSelfProfileAction } from "@/actions";
import { UserEntity } from "../../../../typeorm/src/entities/nextAuth.entity";

type UpdateProfileFormProps = {
  user: UserEntity;
};

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [successUpdateMessage, setSuccessUpdateMessage] = useState<string>();
  const onFinish = async (values: Partial<UserEntity>) => {
    setIsFetching(true);
    const updatedUser = await updateSelfProfileAction(values);
    if (updatedUser instanceof Error) {
      setError(updatedUser);
    } else {
      setSuccessUpdateMessage("Профиль обновлен!");
    }
    setIsFetching(false);
  };
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="UpdateProfileForm"
      onFinish={onFinish}
      disabled={isFetching}
      layout="vertical"
      className="create-order-request-form"
      initialValues={user}
      onValuesChange={() => setSuccessUpdateMessage("")}
    >
      {error && (
        <Form.Item>
          <Alert
            message={error.message}
            description={JSON.stringify(error, null, 2)}
            type="error"
            showIcon={true}
          />
        </Form.Item>
      )}
      <Form.Item
        label="Имя"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Введите ваше имя",
            min: 2,
          },
        ]}
      >
        <Input type="text" maxLength={60} style={{ maxWidth: "500px" }} />
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Введите вашу фамилию",
            min: 2,
          },
        ]}
      >
        <Input type="text" maxLength={60} style={{ maxWidth: "500px" }} />
      </Form.Item>
      <Form.Item label="Обо мне" name="about">
        <Input.TextArea
          rows={3}
          placeholder="Информация в блок 'Обо мне'"
          style={{ maxWidth: "500px" }}
        />
      </Form.Item>
      <Form.Item
        label="Краткая информация"
        name="shortInfo"
        rules={[
          {
            message: "Максимум 120 символов",
            max: 120,
          },
        ]}
      >
        <Input.TextArea
          style={{ maxWidth: "500px" }}
          rows={3}
          placeholder={
            user.status === ProfileType.student
              ? "Студент 2 курса магистратуры"
              : "кандидат технических наук\nдоцент"
          }
        />
      </Form.Item>
      <Form.Item label="Опыт работы" name="experience">
        <Input.TextArea
          rows={3}
          placeholder="Ваш опыт работы"
          style={{ maxWidth: "500px" }}
        />
      </Form.Item>
      <Form.Item
        label={
          <div>
            <p>
              Ссылка на профиль (studinfo360.ru/
              {user.status === ProfileType.student ? "students" : "teachers"}
              /...)
            </p>{" "}
          </div>
        }
        name="slug"
        rules={[
          {
            required: true,
            message: "Введите желаемую ссылку >2 символов",
            min: 2,
          },
          {
            message: "Только латинские буквы, цифры",
            pattern: new RegExp(/^[a-zA-Z0-9]*$/),
          },
        ]}
      >
        <Input
          type="text"
          maxLength={60}
          style={{ maxWidth: "500px" }}
        />
      </Form.Item>
      <Form.Item>
        <button
          type="button"
          style={{
            display: "block",
            marginTop: "10px",
            padding: "2px 8px",
          }}
          onClick={() => {
            form.setFieldValue('slug', user.vkId)
          }}
        >
          Ссылка по умолчанию
        </button>
      </Form.Item>
      <Form.Item>
        <Button
          theme="gradient"
          type="submit"
          additionalClasses="create-order-request-form__submit"
        >
          Сохранить
        </Button>
      </Form.Item>
      {successUpdateMessage && (
        <Form.Item>
          <Alert
            message={successUpdateMessage}
            type="success"
            showIcon={true}
          />
        </Form.Item>
      )}
    </Form>
  );
}
