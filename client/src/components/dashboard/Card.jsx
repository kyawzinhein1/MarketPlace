import { Card, Metric, Text, Badge, Flex } from "@tremor/react";

export function CardUsageExample({ title, count, icon, note }) {
  return (
    <Card className="mt-2 mb-2 cursor-pointer" decoration="top" decorationColor="blue">
      <Flex justifyContent="between" alignItems="center">
        <Text>{title}</Text>
        <Badge size="sm" icon={icon}>
          {note}
        </Badge>
      </Flex>
      <Metric>{count}</Metric>
    </Card>
  );
}
