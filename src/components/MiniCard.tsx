import { Card } from "@mantine/core";

type MiniCardProps = {
  label: string;
  value: number;
};

export default function MiniCard({ label, value }: MiniCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>{label}</Card.Section>
      <Card.Section>{value}</Card.Section>
    </Card>
  );
}
