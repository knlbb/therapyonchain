import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const TabBar = ({ state, descriptors, navigation }: any) => {
    const primaryColor = '#ffffff'
    const greyColor = '#737373'

    const icons = {
        home: (props:any) => <MaterialIcons name="home" size={24} color="black" {...props} />,
        chat: (props:any) => <MaterialIcons name="chat" size={24} color="black" {...props}/>,
        profile: (props:any) => <MaterialIcons name="account-circle" size={24} color="black" {...props} /> 
    }


  return (
    <View style={styles.tabBar}>
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {
                icons[route.name]({
                    color: isFocused ? primaryColor : greyColor
                })
            }
            <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize: 11 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabBar: {
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: "#f3f4f6",
        backgroundColor: "black",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        gap: 4
    }
})

export default TabBar