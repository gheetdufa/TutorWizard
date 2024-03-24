import React from 'react';
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import { Col, Row } from 'antd';

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate) as any;

  const campuses = [
    { id: '', name: 'Select your campus' }, // Placeholder option
    { id: 'campus1', name: 'College Avenue' },
    { id: 'campus2', name: 'Livingston' },
    { id: 'campus3', name: 'Busch' },
    { id: 'campus4', name: 'Cook/Douglas' },
  ];

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span erros={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  // Adjust handleChange to handle select dropdown if necessary
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Call the existing handleChange function or adjust logic as needed
    handleChange(e);
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("Your Name")}
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder={t("Your Email")}
                  value={values.email || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                {/* Dropdown for campus selection */}
                <select name="campus" onChange={handleSelectChange} value={values.campus || ''}>
                  {campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  ))}
                </select>
                <ValidationType type="campus" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={t("Your Message")}
                  value={values.message || ""}
                  name="message"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="primary">{t("Sign Up As Student")}</Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button name="submit">{t("Sign Up As Tutor")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
