import { Animated, Easing } from 'react-native';

export const goUp = (bottomAnim, value) => {
  Animated.timing(bottomAnim, {
    toValue: value,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

export const goDown = (bottomAnim, value) => {
  Animated.timing(bottomAnim, {
    toValue: value,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

export const setVisibilityElement = (visibilityAnim, value) => {
  Animated.timing(visibilityAnim, {
    toValue: value,
    duration: 200,
    useNativeDriver: false,
  }).start();
};

export const fadeInFadeOutVisibilityElement = (visibilityAnimIN) => {
    Animated.timing(visibilityAnimIN, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
};

export const fadeOutScale = (opacityAnim) => {
  Animated.timing(opacityAnim, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }).start();
}
export const setToStart = (opacityAnim) => {
  Animated.timing(opacityAnim, {
    toValue: 1,
    duration: 0,
    useNativeDriver: false,
  }).start();
}

export const animateRotation = (rotateAnim) => {
  Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

export const goUpDown = (heightAnim, max, maxGrad, min, heightGradAnim, bottomAnim, rotateAnim) => {
  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: max,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(heightGradAnim, {
          toValue: maxGrad,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heightGradAnim, {
          toValue: min,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(bottomAnim, {
          toValue: max,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(bottomAnim, {
          toValue: min,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(heightGradAnim, {
          toValue: maxGrad,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: min,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(heightGradAnim, {
        toValue: min,
        duration: 400,
        useNativeDriver: false,
      }),
    ])
  ).start();
};
