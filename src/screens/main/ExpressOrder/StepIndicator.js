import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        {steps.map((step, index) => {
          const isActive = currentStep === step.key;
          const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
          
          return (
            <React.Fragment key={step.key}>
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepDot,
                  isActive ? styles.activeStepDot : {},
                  isCompleted ? styles.completedStepDot : {}
                ]}>
                  {isCompleted ? (
                    <MaterialCommunityIcons name="check" size={14} color="white" />
                  ) : (
                    isActive && <View style={styles.activeDotInner} />
                  )}
                </View>
                
                <Text style={[
                  styles.stepLabel,
                  isActive ? styles.activeStepLabel : {},
                  isCompleted ? styles.completedStepLabel : {}
                ]}>
                  {step.label}
                </Text>
              </View>
              
              {index < steps.length - 1 && (
                <View style={[
                  styles.stepLine,
                  isCompleted ? styles.completedStepLine : {}
                ]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    marginBottom: 0,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  stepItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeStepDot: {
    backgroundColor: '#3b82f6',
  },
  completedStepDot: {
    backgroundColor: '#10b981',
  },
  activeDotInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  stepLabel: {
    fontSize: 10,
    color: '#9e9e9e',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  completedStepLabel: {
    color: '#10b981',
  },
  stepLine: {
    width: 25,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  completedStepLine: {
    backgroundColor: '#10b981',
  },
});

export default StepIndicator; 