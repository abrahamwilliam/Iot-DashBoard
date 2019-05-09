import React, { memo } from 'react';
import { Card, Tabs, Row, Col } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { TimelineChart, MiniProgress, Pie, WaterWave, ChartCard } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import Yuan from '@/utils/Yuan';

// const costBar = 1000;

// function getCostRatio(costData) {
//   let total = 0;
//   if (costData.length > 0) {
//     costData.forEach(cost => {
//       total += cost.y;
//     })
//   }
//   return Math.round( total / costBar * 100);
// }

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
    <Col span={16}>
      <NumberInfo
        title={data.name}
        subTitle={
          <FormattedMessage id="app.analysis.cost-rate" defaultMessage="Cost Rate" />
        }
        gap={2}
        total={`${data.costRate * 100}%`}
        theme={currentKey !== data.name && 'light'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 10 }}>
      <MiniProgress percent={data.costRate * 100} strokeWidth={8} target={80} color="#13C2C2" />
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const BottomAnalysis = memo(
  ({ activeKey, loading, roomData, costData, handleTabChange, temperatureData }) => (
    <Row gutter={24}> 
      <Col xl={16} lg={24} md={24} sm={24} xs={24}>
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            {roomData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={temperatureData}
                    titleMap={{
                      y1: formatMessage({ id: 'app.analysis.temperature-trend' }),
                      // y2: formatMessage({ id: 'app.analysis.electricity-cost' }),
                    }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </Col>
      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage 
              id='app.analysis.billing'
              defaultMessage="Billing" 
            />}
          style={{'marginTop': 32}}
        >
          <Pie
            subTitle={<FormattedMessage id="app.analysis.total-cost" defaultMessage="Total Cost" />}
            total={() => <Yuan>{costData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
            data={costData}
            valueFormat={value => <Yuan>{value}</Yuan>}
            height={270}
            lineWidth={4}
            style={{ padding: '8px 0' }}
          />
        </ChartCard>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage 
              id='app.analysis.cost-analysis'
              defaultMessage="Cost Analysis" 
            />}
          style={{'marginTop': 20, 'textAlign': 'center'}}
          contentHeight={230}
        >
          <WaterWave
            height={210}
            title={
              <FormattedMessage id="app.analysis.budget" defaultMessage="Budget" />
            }
            percent={40}
          />
        </ChartCard>
      </Col>
    </Row>
  )
);

export default BottomAnalysis;
