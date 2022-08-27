import { useState } from "react";
import { Card, Container, Grid, Input, Select, Text } from "@mantine/core";
import "./App.css";

function calculateCoef(A: number, B: number) {
  return A == 0 ? 0 : B / A;
}

type ParamType = "totalWeight" | "resin" | "hardener";

function getTotalWeight(
  propSelected: number,
  type: Exclude<ParamType, "totalWeight">,
  coef: number
) {
  switch (type) {
    case "resin":
      return Math.round(propSelected * (coef + 1) * 100) / 100;
    case "hardener":
      return Math.round(((propSelected * (coef + 1)) / coef) * 100) / 100;
    default:
      throw new Error("oops!");
  }
}

function getResin(
  propSelected: number,
  type: Exclude<ParamType, "resin">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return Math.round((propSelected / (coef + 1)) * 100) / 100;
    case "hardener":
      return Math.round((propSelected / coef) * 100) / 100;
    default:
      throw new Error("oops!");
  }
}

function getHardener(
  propSelected: number,
  type: Exclude<ParamType, "hardener">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return Math.round((propSelected / (coef + 1)) * coef * 100) / 100;
    case "resin":
      return Math.round(propSelected * coef * 100) / 100;
    default:
      throw new Error("oops!");
  }
}

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
        Let's mixepoxy!
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            style={{ margin: "20px" }}
            withBorder
          >
            <Grid>
              <Grid.Col span={6}>
                {selection == "resin"
                  ? input
                  : selection == "hardener"
                  ? getResin(input, "hardener", coef)
                  : getResin(input, "totalWeight", coef)}
                <Text>Resin</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                {selection == "hardener"
                  ? input
                  : selection == "resin"
                  ? getHardener(input, "resin", coef)
                  : getHardener(input, "totalWeight", coef)}
                <Text>Hardener</Text>
              </Grid.Col>
            </Grid>
          </Card>
          <Text>Total weight: </Text>
          {selection == "totalWeight"
            ? input
            : selection == "resin"
            ? getTotalWeight(input, "resin", coef)
            : getTotalWeight(input, "hardener", coef)}
          <Grid>
            <Grid.Col span={6}>
              <Container>
                <Grid>
                  <Grid.Col span={8}>
                    <Text weight={60} size="lg" mt="md">
                      Resin proportion mix
                    </Text>
                  </Grid.Col>
                </Grid>
              </Container>
              <Container>
                <Grid>
                  <Grid.Col span={4}>
                    <Input
                      type="number"
                      placeholder="A"
                      onChange={(evt) => setPropA(evt.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
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
                <Grid.Col span={6}>
                  <Select
                    placeholder="Pick one"
                    description="What is the fixed value?"
                    variant="filled"
                    value={selection}
                    onChange={(val) => setSelection(val as ParamType)}
                    radius="md"
                    data={options}
                  />
                </Grid.Col>
                <Grid.Col
                  span={6}
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
