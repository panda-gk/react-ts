import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button} from 'antd';
import { FormComponentProps } from 'antd/lib/form'

interface IProps extends FormComponentProps {
  formItem: any[],
  children?: any,
  getParams:(any) => void,
  row?: number,
  col?: number,
}
const SearchForm = (props:IProps) => {

  const handleSearch = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      props.getParams(values)
    });
  }

  
 const handleReset = (e) => {
    props.form.resetFields();
    // console.log(props.form.getFieldValue())
    props.form.validateFields((err, values) => {
      props.getParams(values)
    });
  };

  const getFields = () => {
    const { getFieldDecorator } = props.form;
    // 兼容多行表单查询
    const teps = []
    const formItemArrs = []
    props.formItem.forEach((el) => {
      if (!el.length) {
        teps.push(el)
      } else {
        formItemArrs.push(el)
      }
    })
    formItemArrs.push(teps) 
    const children = formItemArrs.map((formItemArr,i) => (
      // el.map((el2, inex))
      <Row gutter={props.row || 20} key={i}>
        {
          formItemArr.map(( formItem, index) => (
            <Col span={props.col || 4} key={`${i}-${index}`} >
              <Form.Item label={`${formItem.label}`} key={`${i}-${index}`}  style={{display:'flex'}}>
                {getFieldDecorator(`${formItem.name}`, {
                  initialValue: formItem.initialValue,
                  rules: formItem.rules || []
                  })(formItem.Compontent)}
              </Form.Item>
            </Col>
          ))
        }
        {
          (i === formItemArrs.length - 1) && 
          <Col span={8}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              重置
            </Button>
            {
              props.children
            }
          </Col>
        }
      </Row>
    ))
    return children;
  }
  return(
    <div>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
          {getFields()}
        </Form>
    </div>
  )
}

export default  Form.create()(SearchForm)