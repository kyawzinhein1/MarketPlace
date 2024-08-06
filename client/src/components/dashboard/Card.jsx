import { Card, Metric, Text, Badge, Flex } from "@tremor/react";

export function CardUsageExample({ title, count, icon, note }) {
  return (
    <Card className="w-full mt-2 mb-2" decoration="top" decorationColor="blue">
      <Flex className="flex justify-between">
        <Text>{title}</Text>
        <Badge size="sm" icon={icon}>
          {note}
        </Badge>
      </Flex>
      <Metric>{count}</Metric>
    </Card>
  );
}
