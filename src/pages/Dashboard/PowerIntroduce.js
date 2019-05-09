/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import numeral from 'numeral';
import moment from 'moment';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar } from '@/components/Charts';
import Trend from '@/components/Trend';


const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const beginDay = new Date().getTime();

const waterData = [];
const initFakeWater = [3,5,7,4,5,2,6,1];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < initFakeWater.length; i++) {
  waterData.push({x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'), y: initFakeWater[i]});
}

const powerData = [];
const initFakePower = [64,76,73,64,75,72,63,80];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < initFakePower.length; i++) {
  powerData.push({x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'), y: initFakePower[i]});
}

// const prevData = [0, 0];
const totalData = [33, 567];

@connect(({ shadows }) => ({
  shadows,
}))
class ResourceCard extends PureComponent {
  
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    prevData: this.props.dataID === 'pw-001' ? initFakePower[initFakePower.length - 1] : initFakeWater[initFakeWater.length - 1],
    change: 0,
  }

  componentDidMount() {
    const { dispatch, dataID } = this.props;
    this.interval = setInterval(() => {
      dispatch({
        type: 'shadows/updateOneShadow',
        payload: { id: dataID }
      });
    }, Math.random() * 4000 + 15000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  

  getUnit(id) {
    return id === 'pw-001' ? ' kW' : ' m3/s';
  }

  // eslint-disable-next-line class-methods-use-this
  chooseDataTitle(dataID) {
    switch(dataID) {
      default: return 'app.analysis.error';
      case 'pw-001': return "app.analysis.power-usage";
      case 'wt-001': return "app.analysis.water-usage";
    }
  }

  // eslint-disable-next-line class-methods-use-this
  chooseCurrentDataTitle(dataID) {
    switch(dataID) {
      default: return 'app.analysis.error';
      case 'pw-001': return "app.analysis.current-power-usage";
      case 'wt-001': return "app.analysis.current-water-usage";
    }
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line react/sort-comp
  renderChart(data, color) {
    const chartComp = <MiniArea color={color} data={data} />;
    return chartComp;
  }

  // eslint-disable-next-line class-methods-use-this
  decideFlag(change) {
    if (change >= 0) {
      return 'up';
    }
    return 'down';
  }

  render() {
    const { data, dataID, shadows: { list } } = this.props;
    let newShadow = {x: moment(), y: 0};
    list.forEach(shadow => {    
      if (shadow.id === dataID) {
        const value = shadow.value ? shadow.status ? shadow.value : 'N/A' : 'Fetching';
        newShadow = {x: shadow.updateTime, y: value};
      } 
    });

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(newShadow.y) && newShadow.y > 0 && newShadow.x !== data[data.length - 1].x && data.length >= 8) {
      // eslint-disable-next-line react/destructuring-assignment
      const change = (newShadow.y - this.state.prevData).toFixed(2);
      // Intent to not use setState to prevent from rerending
      this.state = {
        prevData: newShadow.y,
        // eslint-disable-next-line object-shorthand
        change: change,
      }
      data.shift();
      data.push(newShadow);
      totalData[dataID === 'pw-001' ? 1 : 0] += newShadow.y;
    }

    return (
      <Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id={this.chooseDataTitle(dataID)} defaultMessage="Resource Usage" />}
            action={
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
              >
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={numeral(totalData[dataID === 'pw-001' ? 1 : 0]).format('0,0') + this.getUnit(dataID)}
            contentHeight={46}
          >
            <MiniBar data={data} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id={this.chooseCurrentDataTitle(dataID)} defaultMessage="Current Resource Usage" />}
            action={
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
              >
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            // loading={loading}
            // eslint-disable-next-line no-restricted-globals
            total={newShadow.y + (!isNaN(newShadow.y) ? this.getUnit(dataID) : '')}
            contentHeight={46}
          >
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Trend flag={this.decideFlag(this.state.change)} style={{ marginRight: 16 }}>
              <FormattedMessage id="app.analysis.usage-changes" defaultMessage="Usage Changes" />
              {/* eslint-disable-next-line react/destructuring-assignment */}
              <span className={styles.trendText}> {this.state.change} </span>
            </Trend>
          </ChartCard>
        </Col>
      </Col>
    )
  }
}

@connect(({ shadows }) => ({
  shadows,
}))
class PowerIntroduce extends PureComponent {
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shadows/fetchShadows',     
    }); 
  }

  render() {
    return(
      <Row gutter={24} style={{'marginLeft': -24, 'marginRight': -24}}>
        <ResourceCard 
          data={waterData}
          dataID='wt-001'
          color='#45a4e8'
        />
        <ResourceCard 
          data={powerData}
          dataID='pw-001'
          color='#e2bb0d'
        />
      </Row>
    );
  }
}

export default PowerIntroduce;
