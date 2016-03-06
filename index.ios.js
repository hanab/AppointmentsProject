
'use strict';
//import the countdowntimer class
var CountdownTimer = require('./CountdownTimer');
// this is  a class with an empty view only to implement the NavigatorIOS inital route
var Home = require('./Home');
//Import the native Ios search bar 
var SearchBar = require('react-native-search-bar');


import React, {
  NavigatorIOS,
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


// the URL to the Apiaray  the first element of the array of appointments
var REQUEST_URL = 'http://private-7d5bc1-appointment2.apiary-mock.com/appointments/1';



class AppointmentsProject extends Component {
// initializes the initial state of the appointments object to null
  constructor(props) {
    super(props);
    this.state = {
    appointments: null,
    };
  }
  //load the fetched data after loading components
  componentDidMount() {
    this.fetchData();
  }

// fetch the data from the Api using synchronous GET request
  fetchData() {
     fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
        console.log(responseData);
         this.setState({
          appointments: responseData,
        });
      })
      .done();
    }

 // this is a view which appears until the data is loaded from api and Incase the GET request returns noting
  renderLoadingView() {
     return (
      <View style={styles.container}>
        <Text>
          Loading appointments...
        </Text>
      </View>
     );
   }

   // a function to calculate the time remaining to the appointment date in miliseconds
   getRemainingTime(appointmentDate) {
      var rmt = (Date.parse(appointmentDate) - Date.parse(new Date()));

         return rmt > 0 ? rmt : 0;
  }
  //this function changes the 24 hour time formate to 12 hour with the associated meridians(AM or PM)
  getMeridian(hour) {

    if (hour <= 12) {
        return {'hour' : hour,
           'meridian': "AM"
        };
    } else {

      var h = hour%12;
        return { 'hour' : h,
             'meridian': "PM"
        };

     }

   }
//the rende function of the class
  render() {

      if (!this.state.appointments) {

        return this.renderLoadingView();
     }

      //fetech the appointment from the state
     var app = this.state.appointments;
     // constructs a date object from date string
     var datetime = new Date(app.appointmet_date);
     /* this is used to change the integer value to the corresponding month and date values
     date.getDay() returns value (0-6) and date.getMonth() returns value (0-11)
     */
     var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     var monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
     
    return (
      
      <View style={styles.container}>

      <NavigatorIOS style={styles.Navigator}

       barTintColor= '#81c04d'
        initialRoute={{
        component: Home,
        title: 'Dashboard',
        
      }}  />
     

<View style={styles.contentall}>

        <SearchBar style={styles.searchBar} ref='searchBar' placeholder='Search' tintColor= '#D8D8D8'/> 

        <View style={styles.content}>

            <View style={styles.topContainer}>

              <Text style={styles.messageBoxTitleText}>Your next appointment in </Text>

             <View style={styles.empty}>

             </View>

             <CountdownTimer initialTimeRemaining ={this.getRemainingTime(datetime)} /> 

            </View>
          
            <View style={styles.inContainer}>

               <View style={styles.leftContainer}>

                 <Text style={styles.day}>{days[datetime.getDay()]}</Text>

                <Text style={styles.month}>{monthNames[datetime.getMonth()]+" "+datetime.getDate()}</Text>

                <Text style={styles.day}>{datetime.getFullYear()}</Text>

                <Text style={styles.timeOA}>{this.getMeridian(datetime.getHours()).hour+ ":"+ datetime.getMinutes()}</Text>

                <Text style={styles.timeAm}>{this.getMeridian(datetime.getHours()).meridian}</Text>

               </View>

               <View style={styles.rightContainer}>

                <Text style={styles.timeAm}>{app.Patient_info.surgery_type}</Text>

                <Text style={styles.hospaddress}>{app.hospital_info.hospital_name}</Text>

                <Text style={styles.hospaddress}>{app.hospital_info.address.city}</Text>

                <Text style={styles.hospaddress}>{app.hospital_info.address.zip}</Text>

             </View>

           </View>

           <View style={styles.line}>
                        
           </View>

           <View style={styles.bottomContainer}>

             <View style={styles.bottomtext}> 

               <Text style={styles.directioninfo}>It&lsquo;s time to get going&#33;</Text>

               <Text style={styles.directioninfo2}>Find the fastest route to the hospital&#33;</Text>

             </View>

            <View style={styles.empty}>
                        
            </View>

            <View style={styles.locationContainer}>

               <TouchableOpacity >
                <Image
                 style={styles.button}
                 source={require('image!LocationIcon')} />

              </TouchableOpacity>

             </View> 

            </View> 

         </View>

      </View>
 </View>
        
    );
  }
}


  
const styles = StyleSheet.create({

Navigator: {
marginBottom: 5,
height: 30,
flexDirection: 'row',

}, 

contentall: {
  flex: 1,
  backgroundColor: '#D8D8D8',
  marginTop: 8,
},

button: {
width: 20,
height: 21,

},

 content: {
  
  justifyContent:'flex-start',
  backgroundColor: 'white',
  marginTop: 4,
  marginLeft: 2,
  
  },

 empty: {

flex: 1,
},

searchBar: {
    
    height: 30,
    marginTop: 4,
    
  },

inContainer: {
flexDirection:'row',
marginBottom: 15,
paddingRight: 10,

},

topContainer: {
flexDirection: 'row',
marginTop: 15,
marginBottom: 15,
marginLeft: 15,
marginRight: 15,
},

rightContainer: {
marginLeft:15,
flex:1,
alignItems:'flex-start',
marginTop: 15,
},

  leftContainer: {
    backgroundColor:'#26BCD7',
    width: 120,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:15,
    justifyContent:'flex-end',
    flexDirection:'column',
    
  },

  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

line: {
height: 1,
backgroundColor: '#D8D8D8',
marginLeft: 15,
marginRight: 15,

},

  day: {
    fontSize: 12,
    marginBottom: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',

  },

  month: {
    textAlign: 'center',
    marginBottom: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },

  timeOA: {
    fontSize: 24,
    marginBottom: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  timeAm: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  hospaddress: {

    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
    color: 'black',

  },


 messageBoxTitleText: {
        
        color:'black',
        textAlign:'left',
        fontSize:16,
        marginBottom:10,
    },


    directioninfo: {
     color: 'black',
     textAlign: 'left',
     fontSize: 15,
     marginTop: 10,
    

    },

    bottomContainer: {

      marginLeft: 15,
      flexDirection: 'row',

    },
     
    directioninfo2: {
    marginTop: 8,
    color: 'black',
     textAlign:'left',
     fontSize: 8,
     paddingBottom: 10,

    },

    locationContainer: {
      
      alignItems: 'center',
      marginRight: 20,
      marginTop: 20,



    }
  
});



AppRegistry.registerComponent('AppointmentsProject', () => AppointmentsProject);
