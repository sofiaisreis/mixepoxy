import { useState } from "react";
import { Card, Container, Grid, Input, Select, Text } from "@mantine/core";
import "./App.css";
import MiniCard from "./components/MiniCard";
import { getHardener, getResin, getTotalWeight } from "./utils";

function calculateCoef(A: number, B: number) {
  return A == 0 ? 0 : B / A;
}

type ParamType = "totalWeight" | "resin" | "hardener";

function getLabel(selection: ParamType) {
  switch (selection) {
    case "totalWeight":
      return "Resin+hardener weight (in grams)";
    case "resin":
      return "Resin (in grams)";
    case "hardener":
      return "Hardener weight (in grams)";
    default:
      throw new Error("oops!");
  }
}

function App() {
  const [selection, setSelection] = useState<ParamType>("totalWeight");
  const [propA, setPropA] = useState(0);
  const [propB, setPropB] = useState(0);
  const [input, setInput] = useState(0);

  const coef = calculateCoef(propA, propB);

  const options: { value: ParamType; label: string }[] = [
    { value: "totalWeight", label: "Total weight" },
    { value: "resin", label: "Resin" },
    { value: "hardener", label: "Hardener" },
  ];

  return (
    <Container>
      <Card>
        <Text weight={500} size="lg" mt="md">
          Calculate and Mix (weight)!
        </Text>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid grow>
            <Grid.Col span={4}>
              <MiniCard
                label="Resin"
                value={
                  selection == "resin"
                    ? input
                    : selection == "hardener"
                    ? getResin(input, "hardener", coef)
                    : getResin(input, "totalWeight", coef)
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <MiniCard
                label="Hardener"
                value={
                  selection == "hardener"
                    ? input
                    : selection == "resin"
                    ? getHardener(input, "resin", coef)
                    : getHardener(input, "totalWeight", coef)
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <MiniCard
                label="Total Weight"
                value={
                  selection == "totalWeight"
                    ? input
                    : selection == "resin"
                    ? getTotalWeight(input, "resin", coef)
                    : getTotalWeight(input, "hardener", coef)
                }
              />
            </Grid.Col>
          </Grid>

          <Grid grow gutter="xl" justify="center">
            <Grid.Col span={6}>
              <Container>
                <Text weight={60} size="lg" mt="md">
                  Resin proportion
                </Text>
                <Grid>
                  <Grid.Col span={6}>
                    <Input
                      type="number"
                      placeholder="A"
                      onChange={(evt) => setPropA(evt.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Input
                      type="number"
                      placeholder="B"
                      onChange={(evt) => setPropB(evt.target.value)}
                    />
                  </Grid.Col>
                </Grid>
              </Container>
            </Grid.Col>
            <Grid.Col
              span={6}
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <Grid>
                <Grid.Col span={7}>
                  <Select
                    placeholder="Pick one"
                    description="Weight in grams"
                    variant="filled"
                    value={selection}
                    onChange={(val) => setSelection(val as ParamType)}
                    radius="md"
                    data={options}
                  />
                </Grid.Col>
                <Grid.Col
                  span={5}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Input
                    type="number"
                    placeholder={getLabel(selection)}
                    onChange={(evt) => setInput(Number(evt.target.value))}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
}

export default App;
