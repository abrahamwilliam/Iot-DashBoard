import React, { memo } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
// import numeral from 'numeral';
import styles from './DemoDashboard.less';
import { Bar, MiniArea, ChartCard, Gauge } from '@/components/Charts';
// import styles from './mlcss';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    total: 323234,
  });
}

const TemperatureCard = memo(
  ({ rangePickerValue, temperatureData, isActive, handleRangePickerChange, loading, selectDate }) => (
    <Row gutter={24}> 
      <Col xl={18} lg={24} md={24} sm={24} xs={24}>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 10 }}>
          <div className={styles.temperatureCard}>
            <Tabs
              tabBarExtraContent={
                <div className={styles.salesExtraWrap}>
                  <div className={styles.salesExtra}>
                    <a className={isActive('today')} onClick={() => selectDate('today')}>
                      <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                    </a>
                    <a className={isActive('week')} onClick={() => selectDate('week')}>
                      <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                    </a>
                    <a className={isActive('month')} onClick={() => selectDate('month')}>
                      <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                    </a>
                    <a className={isActive('year')} onClick={() => selectDate('year')}>
                      <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                    </a>
                  </div>
                  <RangePicker
                    value={rangePickerValue}
                    onChange={handleRangePickerChange}
                    style={{ width: 256 }}
                  />
                </div>
              }
              size="large"
              tabBarStyle={{ marginBottom: 24 }}
            >
              <TabPane
                tab={<FormattedMessage id="app.analysis.temperature" defaultMessage="Temperature" />}
                key="sales"
              >
                <Row>
                  <Col xl={24} lg={24} md={24} sm={48} xs={48}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={295}
                        title={
                          <FormattedMessage
                            id="app.analysis.temperature-trend"
                            defaultMessage="Temperature Trend"
                          />
                        }
                        data={temperatureData}
                      />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Col>
      <Col xl={6} lg={24} md={24} sm={24} xs={24}> 
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage 
              id='app.analysis.temperature-analysis'
              defaultMessage="Temperature Analysis" 
            />}
          contentHeight={362}
        >
          <Row> 
            <Col>
              <MiniArea line height={110} data={temperatureData} />
            </Col>
          </Row>
          <Row style={{'marginTop': 40}}> 
            <Col style={{'textAlign': 'center'}}>
              <Gauge
                title={formatMessage({ id: 'app.analysis.temperature-rate', defaultMessage: 'temperature rate' })}
                height={180}
                percent={45}
              />
            </Col>
          </Row>
        </ChartCard>
      </Col>
    </Row> 
  )
);

export default TemperatureCard;
