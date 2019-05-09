import React, { memo } from 'react';
import { Row, Col, Tooltip, Card, Icon } from 'antd';
import { FormattedMessage } from 'umi/locale';
import numeral from 'numeral';
import NumberInfo from '@/components/NumberInfo';
import { MiniArea } from '@/components/Charts';

function sumData(data) {
  let sum = 0;
  data.forEach(item => {
    sum += item.y;
  });
  return sum;
}

const ResourceUsage = memo(({ loading, waterData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage id="app.analysis.resource-usage" defaultMessage="Resource Usage" />
    }
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage 
                id="app.analysis.water-usage" 
                defaultMessage="Water Usage" 
              />
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />}
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          // TODO: sum up usage data and make this dynamic
          total={numeral(sumData(waterData)).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={waterData} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="app.analysis.power-usage"
                defaultMessage="Power Usage"
              />
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />}
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          total={numeral(sumData(waterData)).format('0,0')}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={waterData} />
      </Col>
    </Row>
  </Card>
));

export default ResourceUsage;
