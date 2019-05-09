import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  Card,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const ruleRequired = {
  required: true,
  message: formatMessage({ id: 'validation.required' })
}

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
export default class TypesForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="register.node.title" />}
        content={<FormattedMessage id="register.node.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout}
              label={<FormattedMessage id="register.node.id.label" />}
              help={<FormattedMessage id="register.node.id.help" />}
            >
              {getFieldDecorator('id', { rules: [ ruleRequired ] })(
                <Input placeholder={formatMessage({ id: 'register.node.id.placeholder' })} />
              )}
            </FormItem>

            <FormItem {...formItemLayout}
              label={<FormattedMessage id="register.node.name.label" />}
              help={<FormattedMessage id="register.node.name.help" />}
            >
              {getFieldDecorator('name', { rules: [ ruleRequired ] })(
                <Input placeholder={formatMessage({ id: 'register.node.name.placeholder' })} />
              )}
            </FormItem>

            <FormItem {...formItemLayout}
              label={<FormattedMessage id="register.node.description.label" />}
              help={<FormattedMessage id="register.node.description.help" />}
            >
              {getFieldDecorator('description', { rules: [ ruleRequired ] })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'register.node.description.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="register.node.type.label" />}
              help={<FormattedMessage id="register.node.type.help" />}
            >

              <div>
                {getFieldDecorator('type', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="register.node.type.switch" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="register.node.type.value" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="register.node.type.other" />
                    </Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('valueDetail')(
                    <Input
                      placeholder={formatMessage({ id: 'register.node.type.valueInput.placeholder' })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('type') === '2' ? 'block' : 'none',
                      }}
                    ></Input>
                  )}
                  {getFieldDecorator('otherDetail')(
                    <Input
                      placeholder={formatMessage({ id: 'register.node.type.otherInput.placeholder' })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('type') === '3' ? 'block' : 'none',
                      }}
                    ></Input>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...formItemLayout}
              label={<FormattedMessage id="register.node.tags.label" />}
              help={<FormattedMessage id="register.node.tags.help" />}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={value => console.log(value)}
              >
              </Select>
            </FormItem>


            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
