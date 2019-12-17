


import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,Button,TextInput } from 'react-native';
import { Dialogflow_V2, Dialogflow } from 'react-native-dialogflow';
import Voice from 'react-native-voice';
import { createAppContainer,createStackNavigator} from 'react-navigation';


class VoiceTest extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    msg1 : '',
    msg2:'',
    input1:'',
    input2:'',

    arr:[]
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      // dialogflowConfig.client_email,
     "dialogflow-mbexif@hackathon-jjefun.iam.gserviceaccount.com",
      // dialogflowConfig.private_key,
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbiGzCKZb5EqEU\nhFHVMTNXBVuryj3Tl2dxg/e1pY1YoTvxgOjc9kBzrchw4h+yAaYxN35Jgw/6eFw9\nl58dkCNizEvhFAeFNxLePmv7MkLOqo0+y4WkQ4sRjFHsbfwamzgmE10kcd5gEzgh\nW2J04DIeE1jBWlDLfmSFFmCgEPrTZRqpEWVxzJMdNcOeZ/dsR58a2Ceocib9T4Qu\nQkknn2j78GBSc6nhbaMpMwhl2pf0BLtz9HqBET0EZdeZb8O9CwPyE4CBqKOxsFQI\nDjhdek1vJw78ocKskf1WaZKtVcJ2ctS9k1kI1QWzBWi2mZySZKODDBzAtgt2QvXb\nhGqngWI5AgMBAAECggEACN2LRihaTlrUJ56JVHfybWZME6sCO1V+/1dM4qhvGxVr\nH4oCaAvyFzR9JqExwPqZPMho1eylnEqN2mHmsnxZOs/qajToxyvYcUz+3NZ52rE0\nrNoYs+++Abp+Lh3/Qzl3TMMAQlduhh2N6SZGMAHuxtv7/ADwSCt66+H3CyJsaAAh\n0ZBF7H7+wogGHwj/p5rTAfpJpeOvv0kO7p5RZbwbcfIoF9pp58uaeCsOHMV24f3d\n+Gx0ARUrN33P+bgIqGcTSKgSpqybrB528mlJUWZOfAaAE0bYa42UPrRcWUIHQkxs\nTa79D8UsWOpxU32QJVZkc62HFDPW917iurwM1jFX5QKBgQD4MXl78VRbTIQ/jj9I\nrXFgixsHjLYz4yPp/rN0sA/KyBEm+AGZjEQ6rggSc+qdONeOQeEwR0ILi03TmkDX\npIi8D0oF7sSzQ8JWLnQwovDFqnr6BGRm8frjYUiGngbKFMeB+3um2GO5LlSKqDS5\nFFVMrvXh9N75+uWvwm3PPmiWXQKBgQDicCsutY6kcFD7cc2DhaHQkW9oddIOE3l8\n7KdwENndJs/VFdDnvi8QuNyyRJ3h4E3ZqqehS0rbGFiseosf3iSY7AOnyV0fYI9P\n7ZX2J4nGew4jhEMHtsDgGkM6OFVP+EQUdniUAlQn+HR0BBptQGAtG4XWaw4VGM/1\nvswmx+XFjQKBgGPBVue3HsW3Ymw9Gzh15dz87DdDmjQOtm+lXLGo1iAV+7bi9Zmm\npAHF0x6/kmvw3cqitgT2jxgevIAxPqCt0/tqVcE+r7axpFmJQFAQHaAFHnqA623p\nEoLzpffdajMs2OdokdGEpchXU8mLQ+2ju4kfxVo1Vq245zqWdhZXKihNAoGAJiz1\nCs3vO4f4DzxTgq3/5vLuDnV2sYrU+5vGat1cba2CcpFYBAoLU01nX+Kzn4Y6ec0M\nr+PKvf9vy7xpQjkogGOiBiKrwYN9BeOvWa22y7CpZJGC34UPJXkoBmPC9lWL3MtQ\nbtuppod70qdycSLeVByExu6LlED3pp3BO3SOJ20CgYEA6zFRRuGxtBM4c9UOvps4\ntGTc1cDO7NzYlhbR6TASG+oNjy3veyaUb8EZyuc+3m+9o2lwkqnIJf5AG4WWDrU2\nYfwCwqo+ceqqjePiAoHCwUZvfZxdVbkGze7juZGJWenOrV7gnBm9DiwqOhdpimR0\n246FofV121rYnEEx4cuxEpA=\n-----END PRIVATE KEY-----\n",
      Dialogflow_V2.LANG_ENGLISH_US,
      // dialogflowConfig.project_id
      "hackathon-jjefun",
    );
  }



  onSpeechStart = e => {
    // eslint-disable-next-line
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = e => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
      // making api calls from the text recieved from text to voice library, the text is in partialresults[0].
      Dialogflow_V2.requestQuery(this.state.partialResults[0], result=> {


        this.setState({msg1: result.queryResult.fulfillmentText })
        
        
        console.log(result.queryResult.fulfillmentText)
        // return(<Text>
        //   result.queryResult.fulfillmentText
        // </Text>)
      }
      )
      
   
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('./button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
        <Text style={{margin:50}}>
                {this.state.msg1}
     </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});






class main extends React.Component{


  state = {
    messages: [
      {
        _id: 1,
        text: '',
        
      }
    ],
 
    msg1 : '',
    msg2:'',
    input1:'',
    input2:'',

    arr:[]
  };

  


  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      // dialogflowConfig.client_email,
    "--->> Your client email <<---"
      // dialogflowConfig.private_key,
   "--->> Your Api key <<---"
      Dialogflow_V2.LANG_ENGLISH_US,
      // dialogflowConfig.project_id
      "--->> Project-ID<<---",
    );
  }


  onSend(message) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));

    // let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleResponse(result),
      error => console.log(error)
    );
  }

 
  render(){
    return(
        <View>


<TextInput
          label="Enter the text"
         style ={{margin:20}}
          placeholder="Enter the text"
          
          
          onChangeText={text => this.setState({ input1:text })}
          
          />

                <Button
                title = 'start'
                onPress={() => {
                  Dialogflow_V2.requestQuery(this.state.input1, result=> {


                    this.setState({msg1: result.queryResult.fulfillmentText })
                    
                    
                    console.log(result.queryResult.fulfillmentText)
                    // return(<Text>
                    //   result.queryResult.fulfillmentText
                    // </Text>)
                  }
                
                  
                  ), error=>console.log(error);
               }}
   />

   <Text style={{margin:50}}>
                {this.state.msg1}
     </Text>

     {/* <Button
                title = 'start'
                onPress={() => {
                  Dialogflow_V2.requestQuery("my name is yash", result=> {


                    this.setState({msg2: result.queryResult.fulfillmentText })
                    
                    
                    console.log(result.queryResult.fulfillmentText)
                    // return(<Text>
                    //   result.queryResult.fulfillmentText
                    // </Text>)
                  }
                
                  
                  ), error=>console.log(error);
               }}
               />

<Text style={{margin:50}}>
                {this.state.msg2}
     </Text> */}
       
      </View>
    )
  }
}



// const AppNavigator = createStackNavigator({
 
//   Home: VoiceTest,
//   test : main,
  
  
  
// }
  
//   );
  
  
  export default VoiceTest;



