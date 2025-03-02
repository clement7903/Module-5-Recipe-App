import { FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import RecipeStyles from "../styles/RecipeStyles";
import sampleRecipe from "../screens/SampleRecipes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

export default Recipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  const cuisines = [...new Set(sampleRecipe
    .map(recipe => recipe.cuisine)
    .filter(cuisine => cuisine !== undefined && cuisine !== "")
  )];
  
  // filters the recipes based on the search term and selected cuisine
  const filteredRecipes = sampleRecipe.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCuisine === "" || recipe.cuisine === selectedCuisine)
  );

  return (
    <SafeAreaView>
      <TextInput
        style={RecipeStyles.searchBar}
        placeholder="Search recipes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <RNPickerSelect
        onValueChange={setSelectedCuisine}
        items={[
          { label: "All Cuisines", value: "" },
          ...cuisines.map(cuisine => ({ label: cuisine, value: cuisine }))
        ]}
        style={{
          inputIOS: RecipeStyles.picker,
          inputAndroid: RecipeStyles.picker
        }}
        placeholder={{ label: "Select Cuisine", value: "" }}
      />

      <ScrollView style={RecipeStyles.scrollView}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((selectedRecipe, index) => (
            <View key={index} style={RecipeStyles.MainContainer}>
              <Image
                source={{ uri: selectedRecipe.imgSrc }}
                style={RecipeStyles.image}
              />
              <Text style={RecipeStyles.title}>
                {selectedRecipe.title.toUpperCase()}
              </Text>
              <Text style={RecipeStyles.description}>
                {selectedRecipe.description}
              </Text>
              <View style={RecipeStyles.subContainer}>
                <Text style={RecipeStyles.subTitle}>INGREDIENTS</Text>
                <FlatList
                  data={selectedRecipe.ingredients}
                  renderItem={({ item, index }) => (
                    <Text style={RecipeStyles.list}>
                      {index + 1}. {item}
                    </Text>
                  )}
                />
              </View>
              <View style={RecipeStyles.subContainer}>
                <Text style={RecipeStyles.subTitle}>Steps</Text>
                <FlatList
                  data={selectedRecipe.steps}
                  renderItem={({ item, index }) => (
                    <Text style={RecipeStyles.list}>
                      Step {index + 1}: {item}
                    </Text>
                  )}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={RecipeStyles.noResults}>No recipes found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
