import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";

const CategoriesScreen = () => {
  return (
    <Screen>
      <LinearGradient
        style={styles.container}
        colors={["#8EC5FC", "#E0C3FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.ContentContainer}>
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View>
              <SearchBar />
            </View>
            <View>
              <Text style={styles.categoriesTitles}>CATEGORIES</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/politics.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>రాజకీయాలు</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/ap.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>ఆంధ్రప్రదేశ్</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/ts.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>తెలంగాణ</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/nation.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>జాతీయం</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/international.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>అంతర్జాతీయం</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/sports.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>క్రీడలు</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/cinema.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>సినిమాలు</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/bussiness.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>బిజినెస్</Text>
            </View>
            <View style={styles.catCard}>
              <Image
                source={require("../asserts/categoriesImages/technology.png")}
                style={styles.catImage}
              />
              <Text style={styles.catText}>టెక్నాలజీ</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContentContainer: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  categoriesTitles: {
    fontSize: 20,
    fontWeight: "bold",

    fontWeight: "bold",
  },
  catImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  catText: {
    marginTop: 5,
    fontSize: 15,
    marginTop: 25,
    fontWeight: "500",
  },
  catCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
