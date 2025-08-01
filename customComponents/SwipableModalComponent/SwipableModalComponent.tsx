import { setShowTabNavigator } from "@/Utils/redux/reducers/theme.slice";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

const SwipableModalComponent = ({
  darkMode,
  visible,
  onOpen,
  onClose,
  modalComparativeHeight = 0.7,
  children,
}: {
  darkMode: boolean;
  visible: boolean;
  onOpen?: () => void;
  onClose: () => void;
  modalComparativeHeight?: number;
  children?: React.ReactNode;
}) => {
  const MODAL_HEIGHT = SCREEN_HEIGHT * modalComparativeHeight;
  const SWIPE_THRESHOLD = 50;

  // Animation values
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height);

        // Animate the modal upward
        Animated.timing(keyboardOffset, {
          toValue: -height * 0.9  ,
          duration: Platform.OS === "ios" ? event.duration : 250,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      (event) => {
        setKeyboardHeight(0);

        // Animate the modal back to original position
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: Platform.OS === "ios" ? event.duration : 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const openModal = () => {
    setIsVisible(true);
    onOpen?.();
    // Animate modal up and backdrop in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    // Reset keyboard offset when closing
    keyboardOffset.setValue(0);

    // Animate modal down and backdrop out
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: MODAL_HEIGHT,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      translateY.setValue(MODAL_HEIGHT);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 10
        );
      },
      onPanResponderGrant: () => {
        translateY.stopAnimation();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dy, vy } = gestureState;
        if (dy > SWIPE_THRESHOLD || vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const handleBackdropPress = () => {
    Keyboard.dismiss();
    onClose();
  };

  if (!isVisible) {
    return null;
  }
  const themeStyles = getThemeStyles(darkMode);

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContainer,
          themeStyles.modalContainer,
          {
            height: MODAL_HEIGHT,
            transform: [{ translateY }, { translateY: keyboardOffset }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.dragHandle, themeStyles.dragHandle]} />
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          {children}
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

// Theme-specific styles
const getThemeStyles = (darkMode: boolean) => {
  return StyleSheet.create({
    modalContainer: {
      backgroundColor: darkMode ? "#1C1C1E" : "white",
    },
    dragHandle: {
      backgroundColor: darkMode ? "#48484A" : "#ccc",
    },
    text: {
      color: darkMode ? "#FFFFFF" : "#333333",
    },
    secondaryText: {
      color: darkMode ? "#8E8E93" : "#666666",
    },
  });
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    elevation: 99999,
    backgroundColor: "transparent",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  // Modal container
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 999999,
    zIndex: 999999,
  },

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default SwipableModalComponent;
