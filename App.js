import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Recipe from "./screens/Recipe.archive";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IsLoadingAndEditingProvider } from "./context/IsLoadingAndEditingContext";
import { UserProvider, useUser } from "./context/UserContext";

import { Provider as PaperProvider } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecipesScreen from "./screens/RecipesScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import LoginScreen from "./screens/LoginScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AuthStackNavigator}
        options={{
          title: "Home Page",
          tabBarIcon: ({ color, size }) => {
            return (
              <AntDesign name="home" size={size} color={color}></AntDesign>
            );
          },
        }}
      />
      <Tab.Screen
        name="addRecipe"
        component={AddRecipeScreen}
        options={{
          title: "Add recipe",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="add-circle-sharp"
                size={size}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    {/* <Drawer.Screen name="Home" component={TabNavigator} /> */}
    <Drawer.Screen name="Recipes" component={TabNavigator} />
    <Drawer.Screen name="Favourites" component={FavouritesScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

const RecipeStack = createStackNavigator();

const RecipeStackNavigator = () => (
  <RecipeStack.Navigator screenOptions={{ headerTransparent: true }}>
    <RecipeStack.Screen name="Recipes" component={RecipesScreen} />
    <RecipeStack.Screen name="Add Recipe" component={AddRecipeScreen} />
  </RecipeStack.Navigator>
);

const AuthStackNavigator = () => {
  const { user } = useUser(); // Check if user is logged in
  const AuthStack = createStackNavigator(); // Define the StackNavigator here

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <AuthStack.Screen name="Recipes" component={DrawerNavigator} />
      ) : (
        <>
          <AuthStack.Screen name="Home" component={HomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Recipes" component={RecipesScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Recipe"
          component={Recipe}
          options={{
            title: "recipe",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="food-variant"
                  size={size}
                  color={color}
                />
              );
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Add Recipe"
          component={AddRecipe}
          options={{
            title: "Add Recipe",
            tabBarIcon: ({ size, color }) => {
              return (
                <Ionicons name="add-circle-sharp" size={size} color={color} />
              );
            },
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  const StackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <PaperProvider>
      <UserProvider>
        <IsLoadingAndEditingProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </IsLoadingAndEditingProvider>
      </UserProvider>
    </PaperProvider>
  );
}
