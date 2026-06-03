import { Tabs } from 'expo-router';
import { CircleIconButton } from '../../src/components/CircleIconButton';
import { colors } from '../../src/theme/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bgGradientBottom,
          borderTopWidth: 0,
          height: 74,
          paddingTop: 10,
          paddingBottom: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <CircleIconButton icon="home" active={focused} size={42} />,
        }}
      />
      <Tabs.Screen
        name="clima"
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleIconButton icon="search" active={focused} size={42} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculos"
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleIconButton icon="add" active={focused} size={42} iconSize={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="agroia"
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleIconButton icon="sparkles" active={focused} size={42} />
          ),
        }}
      />
      <Tabs.Screen
        name="mais"
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleIconButton icon="person" active={focused} size={42} />
          ),
        }}
      />
    </Tabs>
  );
}
