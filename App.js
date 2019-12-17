


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
    partialResults: [], // to store final output
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
     "--->> CLient email <<---",
      // dialogflowConfig.private_key,
    "--->> YOUR API KEY <<---"
      Dialogflow_V2.LANG_ENGLISH_US,
      // dialogflowConfig.project_id
      "Project-id",
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




// main for text chatbot.

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

// export main for text chatbot and VoiceTest for voice chatbot

