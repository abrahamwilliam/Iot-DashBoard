import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button'
import style from './styles.less';
import { Divider } from 'antd';
import { connect } from 'dva';
import { Icon, Menu, Dropdown, Avatar } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './DemoDashboard.less';
import workstyles from './Workplace.less';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Graph from './Graph';

@connect(({ history, user, loading }) => ({
  history,
  currentUser: user.currentUser,
  loading: loading.effects['history/fetch_history'],
}))




// function new_script(src) {
//   return new Promise(function(resolve, reject){
//     var script = document.createElement('script');
//     script.src = src;
//     script.addEventListener('load', function () {
//       resolve();
//     });
//     script.addEventListener('error', function (e) {
//       reject(e);
//     });
//     document.body.appendChild(script);
//   })
// };

// var my_script = new_script('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js');

export default class mlcomponent extends Component {
constructor(props) {
  super(props)

  this.state = {
    svalue:"",
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    gvalues:'',
    graph:''
  }

  
function new_script(src) {
  return new Promise(function(resolve, reject){
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};

var my_script = new_script('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js');


  this.handlechange=this.handlechange.bind(this);
}



do_load = () => {
  var self = this;
  my_script.then(function() {
    self.setState({'status': 'done'});
  }).catch(function() {
    self.setState({'status': 'error'});
  })
}

 handlechange(selected) {
   this.setState({
       svalue:selected.target.value
   });
    let roomSelected=selected.target.value;
    console.log(roomSelected);
    localStorage.setItem('roomno', roomSelected);
   
}

handleRangePickerChange = rangePickerValue => {
  const { dispatch } = this.props;
  this.setState({
    rangePickerValue,
  });

  dispatch({
    type: 'history/fetch_history',
  });
};

selectDate = type => {
  const { dispatch } = this.props;
  this.setState({
    rangePickerValue: getTimeDistance(type),
  });

  dispatch({
    type: 'history/fetch_history',
  });
};

isActive = type => {
  const { rangePickerValue } = this.state;
  const value = getTimeDistance(type);
  if (!rangePickerValue[0] || !rangePickerValue[1]) {
    return '';
  }
  if (
    rangePickerValue[0].isSame(value[0], 'day') &&
    rangePickerValue[1].isSame(value[1], 'day')
  ) {
    return styles.currentDate;
  }
  return '';
};


componentWillMount(){

  const { dispatch } = this.props;
  dispatch({
    type: 'history/clear',
  });
  cancelAnimationFrame(this.reqRef);


    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js";
    script.async = true;

    document.body.appendChild(script);


    const script1 = document.createElement("script");

    script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js";
    script1.async = true;

    document.body.appendChild(script1);

    const script2 = document.createElement("script");

    script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
    script2.async = true;

    document.body.appendChild(script2);

console.log("tfjvs loaded");
    
    let cleaneddata=[];
    async function getData() {
     let result=[]
    var start=Date.now();
    let roomNumber="tmp-"
    roomNumber +=localStorage.getItem('roomno');
    console.log(roomNumber);
    let url="http://localhost:8000/api/shadows/"+roomNumber;
    // var url="http://localhost:8000/api/shadows/tmp-101";
      for(let i=0;i<10;i++){
        let carsDataReq =""
          if( url.includes("tmp")){
            carsDataReq= await fetch(url);  
     
          }else{
            url="http://localhost:8000/api/shadows/tmp-101";
             carsDataReq = await fetch(url);  
          }
          let f= new Array();
      const carsData = await carsDataReq.json();  
      // console.log(JSON.stringify(carsData));
      const s=carsData;
      f.push(s);
      // console.log(f);
      
      const cleaned = f.map(d => ({
          time: Date.now() - start,
        temperature: d.value,
      }));
      cleaneddata.push(cleaned);
     
    }
    
     let asset=[];
    for(let i=0;i<100;i++){
    result.concat(cleaneddata[i]);
    }
     console.log(cleaneddata.flat());
      return cleaneddata.flat();
    }
    let values='';
    async function ff(){
    const data = await getData();
     values = data.map(d => ({
     
      x: d.time,
      y: d.temperature,
    }));
  
    
        }
     
        let gvalues=values;
        this.setState({
          gvalues
        })
        console.log(this.state.gvalues);
    

    
      // let graph= tfvis.render.scatterplot(
      //   {name: 'time[milliseconds] v temperature[Celsius]'},
      //   {gvalues}, 
      //   {
      //     xLabel: 'time',
      //     yLabel: 'temperature',
      //     height: 300
      //   }
      // );

      // this.setState({
      //   graph:graph
      // })


    ff();

}



componentDidMount(){
  const script = document.createElement("script");

  script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js";
  script.async = true;

  document.body.appendChild(script);


  const script1 = document.createElement("script");

  script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js";
  script1.async = true;

  document.body.appendChild(script1);

  const script2 = document.createElement("script");

  script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
  script2.async = true;

  document.body.appendChild(script2);

    let cleaneddata=[];
    async function getData() {
     let result=[]
    var start=Date.now();
    let roomNumber="tmp-"
    roomNumber +=localStorage.getItem('roomno');
    console.log(roomNumber);
    let url="http://localhost:8000/api/shadows/"+roomNumber;
    // var url="http://localhost:8000/api/shadows/tmp-101";
      for(let i=0;i<10;i++){
        let carsDataReq =""
          if( url.includes("tmp")){
            carsDataReq= await fetch(url);  
     
          }else{
            url="http://localhost:8000/api/shadows/tmp-101";
             carsDataReq = await fetch(url);  
          }
          let f= new Array();
      const carsData = await carsDataReq.json();  
      // console.log(JSON.stringify(carsData));
      const s=carsData;
      f.push(s);
      // console.log(f);
      
      const cleaned = f.map(d => ({
          time: Date.now() - start,
        temperature: d.value,
      }));
      cleaneddata.push(cleaned);
     
    }
    
     let asset=[];
    for(let i=0;i<100;i++){
    result.concat(cleaneddata[i]);
    }
     console.log(cleaneddata.flat());
      return cleaneddata.flat();
    }
    
    
    async function run() {
      // Load and plot the original input data that we are going to train on.
      const data = await getData();
      const values = data.map(d => ({
       
        x: d.time,
        y: d.temperature,
      }));
    
      tfvis.render.scatterplot(
        {name: 'time[milliseconds] v temperature[Celsius]'},
        {values}, 
        {
          xLabel: 'time',
          yLabel: 'temperature',
          height: 300
        }
      );
      const model = createModel();  
      tfvis.show.modelSummary({name: 'Model Summary'}, model);
    
      // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
    console.log(tensorData)
        
    // Train the model  
    await trainModel(model, inputs, labels);
    console.log('Done Training');
    
    // Make some predictions using the model and compare them to the
    // original data
    testModel(model, data, tensorData);
    }
    
    
    
    
    function createModel() {
      // Create a sequential model
      const model = tf.sequential(); 
      
      // Add a single hidden layer
      model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
      
      // Add an output layer
      model.add(tf.layers.dense({units: 1, useBias: true}));
    
      return model;
    }
    
    
    function convertToTensor(data) {
      // Wrapping these calculations in a tidy will dispose any 
      // intermediate tensors.
      // temperature
      return tf.tidy(() => {
        // Step 1. Shuffle the data    
        tf.util.shuffle(data);
    
        // Step 2. Convert data to Tensor
        const inputs = data.map(d => d.time)
        const labels = data.map(d => d.temperature);
    
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    
        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();  
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();
        console.log(inputMax);
        console.log(inputMin);
    
        console.log(labelMax);
        console.log(labelMin);
        
    
        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
    
        return {
          inputs: normalizedInputs,
          labels: normalizedLabels,
          // Return the min/max bounds so we can use them later.
          inputMax,
          inputMin,
          labelMax,
          labelMin,
        }
      });  
    }
    
    
    
    async function trainModel(model, inputs, labels) {
      // Prepare the model for training.  
      model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
      });
      
      const batchSize = 28;
      const epochs = 50;
      
      return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: 'Training Performance' },
          ['loss', 'mse'], 
          { height: 200, callbacks: ['onEpochEnd'] }
        )
      });
    }
    
    
    function testModel(model, inputData, normalizationData) {
      const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
      
      // Generate predictions for a uniform range of numbers between 0 and 1;
      // We un-normalize the data by doing the inverse of the min-max scaling 
      // that we did earlier.
    
      // 'time',
      // yLabel: 'temperature'
      const [xs, preds] = tf.tidy(() => {
        
        const xs = tf.linspace(0, 1, 100);      
        const preds = model.predict(xs.reshape([100, 1]));   
        console.log("preds");
        console.log(preds);
        const unNormXs = xs
          .mul(inputMax.sub(inputMin))
          .add(inputMin);
        
        const unNormPreds = preds
          .mul(labelMax.sub(labelMin))
          .add(labelMin);
        
          console.log(unNormPreds.dataSync());
        // Un-normalize the data
        return [unNormXs.dataSync(), unNormPreds.dataSync()];
      });
      
     
      const predictedPoints = Array.from(xs).map((val, i) => {
        return {x: val, y: preds[i]}
      });
    
      // console.log(predictedPoints);
      
      const originalPoints = inputData.map(d => ({
        x: d.time, y: d.temperature,
      }));
      
      
      tfvis.render.scatterplot(
        {name: 'Model Predictions vs Original Data'}, 
        {values: [originalPoints, predictedPoints], series: ['original', 'predicted']}, 
        {
          xLabel: 'time',
          yLabel: 'temperature',
          height: 300
        }
      );
    }
    
    
run()

const { dispatch } = this.props;
this.reqRef = requestAnimationFrame(() => {
  dispatch({
    type: 'history/fetch_history',
  });
});

    
}

componentDidUpdate(){
    

    let cleaneddata=[];
    async function getData() {
     let result=[]
    var start=Date.now();
    let roomNumber="tmp-"
    roomNumber +=localStorage.getItem('roomno');
    console.log(roomNumber);
    let url="http://localhost:8000/api/shadows/"+roomNumber;
    // var url="http://localhost:8000/api/shadows/tmp-101";
      for(let i=0;i<10;i++){
        const carsDataReq =""
          if( url.includes("tmp")){
            carsDataReq= await fetch(url);  
     
          }else{
            url="http://localhost:8000/api/shadows/tmp-101";
             carsDataReq = await fetch(url);  
          }
          let f= new Array();
      const carsData = await carsDataReq.json();  
      // console.log(JSON.stringify(carsData));
      const s=carsData;
      f.push(s);
      // console.log(f);
      
      const cleaned = f.map(d => ({
          time: Date.now() - start,
        temperature: d.value,
      }));
      cleaneddata.push(cleaned);
     
    }
    
     let asset=[];
    for(let i=0;i<100;i++){
    result.concat(cleaneddata[i]);
    }
     console.log(cleaneddata.flat());
      return cleaneddata.flat();
    }
    
    
    async function run() {
      // Load and plot the original input data that we are going to train on.
      const data = await getData();
      const values = data.map(d => ({
       
        x: d.time,
        y: d.temperature,
      }));
    
      tfvis.render.scatterplot(
        {name: 'time[milliseconds] v temperature[Celsius]'},
        {values}, 
        {
          xLabel: 'time',
          yLabel: 'temperature',
          height: 300
        }
      );
      const model = createModel();  
      tfvis.show.modelSummary({name: 'Model Summary'}, model);
    
      // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
    console.log(tensorData)
        
    // Train the model  
    await trainModel(model, inputs, labels);
    console.log('Done Training');
    
    // Make some predictions using the model and compare them to the
    // original data
    testModel(model, data, tensorData);
    }
    
    
    
    
    function createModel() {
      // Create a sequential model
      const model = tf.sequential(); 
      
      // Add a single hidden layer
      model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
      
      // Add an output layer
      model.add(tf.layers.dense({units: 1, useBias: true}));
    
      return model;
    }
    
    
    
    
    function convertToTensor(data) {
      // Wrapping these calculations in a tidy will dispose any 
      // intermediate tensors.
      // temperature
      return tf.tidy(() => {
        // Step 1. Shuffle the data    
        tf.util.shuffle(data);
    
        // Step 2. Convert data to Tensor
        const inputs = data.map(d => d.time)
        const labels = data.map(d => d.temperature);
    
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    
        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();  
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();
        console.log(inputMax);
        console.log(inputMin);
    
        console.log(labelMax);
        console.log(labelMin);
        
    
        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
    
        return {
          inputs: normalizedInputs,
          labels: normalizedLabels,
          // Return the min/max bounds so we can use them later.
          inputMax,
          inputMin,
          labelMax,
          labelMin,
        }
      });  
    }
    
    
    
    async function trainModel(model, inputs, labels) {
      // Prepare the model for training.  
      model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
      });
      
      const batchSize = 28;
      const epochs = 50;
      
      return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: 'Training Performance' },
          ['loss', 'mse'], 
          { height: 200, callbacks: ['onEpochEnd'] }
        )
      });
    }
    
    
    
    
    
    function testModel(model, inputData, normalizationData) {
      const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
      
      // Generate predictions for a uniform range of numbers between 0 and 1;
      // We un-normalize the data by doing the inverse of the min-max scaling 
      // that we did earlier.
    
      // 'time',
      // yLabel: 'temperature'
      const [xs, preds] = tf.tidy(() => {
        
        const xs = tf.linspace(0, 1, 100);      
        const preds = model.predict(xs.reshape([100, 1]));   
        console.log("preds");
        console.log(preds);
        const unNormXs = xs
          .mul(inputMax.sub(inputMin))
          .add(inputMin);
        
        const unNormPreds = preds
          .mul(labelMax.sub(labelMin))
          .add(labelMin);
        
          console.log(unNormPreds.dataSync());
        // Un-normalize the data
        return [unNormXs.dataSync(), unNormPreds.dataSync()];
      });
      
     
      const predictedPoints = Array.from(xs).map((val, i) => {
        return {x: val, y: preds[i]}
      });
    
      // console.log(predictedPoints);
      
      const originalPoints = inputData.map(d => ({
        x: d.time, y: d.temperature,
      }));
      
      
      tfvis.render.scatterplot(
        {name: 'Model Predictions vs Original Data'}, 
        {values: [originalPoints, predictedPoints], series: ['original', 'predicted']}, 
        {
          xLabel: 'time',
          yLabel: 'temperature',
          height: 300
        }
      );
    }
    
    
run()


    
}











  render() {
    const { rangePickerValue, currentTabKey } = this.state;
    const { history, loading } = this.props;
    const {
      demoTemperature,
      timechartTemp,
      roomData,
      costData,
      // loading,
    } = history;
    const {
      currentUser,
      currentUserLoading,
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (roomData[0] && roomData[0].name);

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={workstyles.pageHeaderContent}>
          <div className={workstyles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={workstyles.content}>
            <div className={workstyles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

      const extraContent = (
        <div className={workstyles.extraContent}>
          <div className={workstyles.statItem}>
            <p>项目数</p>
            <p>56</p>
          </div>
          <div className={workstyles.statItem}>
            <p>团队内排名</p>
            <p>
              8<span> / 24</span>
            </p>
          </div>
          <div className={workstyles.statItem}>
            <p>项目访问</p>
            <p>2,223</p>
          </div>
        </div>
      );

      
      const script = document.createElement("script");

      script.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js";
      script.async = true;
  
      document.body.appendChild(script);
  
  
      const script1 = document.createElement("script");
  
      script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js";
      script1.async = true;
  
      document.body.appendChild(script1);
  
      const script2 = document.createElement("script");
  
      script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
      script2.async = true;
  
      document.body.appendChild(script2);

      var self = this;
      if (self.state.status === 'start') {
        self.state.status = 'loading';
        setTimeout(function () {
          self.do_load()
        }, 0);
      }
  

// console.log(tfvis);
      


    return (
      <React.Fragment>
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      ></PageHeaderWrapper>
      <div>
         
        {this.state.graph}
        
        <section className="container" >
        <div id="one" className={style.box}>
        <h1>Temperature Prediction</h1>
        <p>Nueral network deployed in the frontend is getting the data from backend and training the model</p>
        <button  className={style.custom} type="submit" defaultValue={this.state.svalue} value="102"  onSubmit={this.handlechange}>Room Number</button>
   
          <header></header>
    
          <h3> <label>Select the Room number</label></h3><select className={style.custom}   name="sindex" defaultValue={this.state.svalue}  onChange={this.handlechange}>
        <option value="101">101</option>
        <option value="102">102</option>
        <option value="201">201</option>
        <option value="301">301</option>
        <option value="302">302</option>      
        </select>
          <br/>
      
        <br/>
        <br/>
        </div>
        <div className={style.box}>
        <img src={require('./sampleip.jpg')} />
        </div>
        <div id="one" className={style.box}>
        <h1>Power Prediction</h1>
        <p>Nueral network deployed in the frontend is getting the data from backend and training the model</p>
        <button  className={style.custom} type="submit" defaultValue={this.state.svalue} value="102"  onSubmit={this.handlechange}>Room Number</button>
   
          <header></header>
         
          <h3> <label>Select the Room number</label></h3><select  className={style.custom} name="sindex" defaultValue={this.state.svalue}  onChange={this.handlechange}>
        <option value="101">101</option>
        <option value="102">102</option>
        <option value="201">201</option>
        <option value="301">301</option>
        <option value="302">302</option>      
        </select>
          <br/>
      
        <br/>
        <br/>
        </div>
        <div className={style.box}>
        <img src={require('./bestop.jpg')} />
        </div>
        
        </section>
        <br/>
        <br/>
     {/* <b>< a href='http://localhost/index.html'><b>Click here for model</b></a></b> */}
      </div>
      </React.Fragment>
    )
  }
}
