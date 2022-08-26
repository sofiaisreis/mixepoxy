import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Card,
  Container,
  Grid,
  Input,
  NumberInput,
  Radio,
  Tabs,
  Text,
} from "@mantine/core";

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
      return propSelected * (coef + 1);
    case "hardener":
      return (propSelected * (coef + 1)) / coef;
    default:
      return 0;
  }
}

function getResin(
  propSelected: number,
  type: Exclude<ParamType, "resin">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return propSelected / (coef + 1);
    case "hardener":
      return propSelected / coef;
    default:
      return 0;
  }
}

function getHardener(
  propSelected: number,
  type: Exclude<ParamType, "hardener">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return (propSelected / (coef + 1)) * coef;
    case "resin":
      return propSelected * coef;
    default:
      return 0;
  }
}

function getCurrValue(value: string) {
  if (value == "totalWeight") return 0;
  else if (value == "resin") return 1;
  else if (value == "hardener") return 2;
  else return;
}

function App() {
  const [value, setValue] = useState<ParamType>("totalWeight");
  const [propA, setPropA] = useState(0);
  const [propB, setPropB] = useState(0);
  const [inputTotalWeight, setInputTotalWeight] = useState(0);
  const [inputResin, setInputResin] = useState(0);
  const [inputHardener, setInputHardener] = useState(0);

  const coef = calculateCoef(propA, propB);
  const ratio = calculateCoef(propA, propB) + 1;

  return (
    <Container>
      <Card>
        <Text weight={500} size="lg" mt="md">
          Calculate and Mix (weight)!
        </Text>
        <Container>
          <Grid>
            <Grid.Col span={8}>
              <Text weight={60} size="lg" mt="md">
                Resin proportion mix
              </Text>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text weight={60} size="lg" mt="md">
                Coeficient
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
        <Container>
          <Grid>
            <Grid.Col span={4}>
              <Input
                type={"number"}
                placeholder="A prop (Resin)"
                onChange={(evt) => setPropA(evt.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Input
                type={"number"}
                placeholder="B prop (Hardener)"
                onChange={(evt) => setPropB(evt.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Text weight={60} size="lg" mt="md">
                {coef}
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
        Let's mixepoxy!
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Radio.Group
            value={value}
            onChange={(val) => setValue(val as ParamType)}
          >
            <Container>
              <>
                <Radio
                  value="totalWeight"
                  label="Total Weight"
                  defaultChecked
                />
                {value == "totalWeight" ? (
                  <Input
                    type={"number"}
                    placeholder="Resin+hardener weight (in grams)"
                    onChange={(evt) =>
                      setInputTotalWeight(Number(evt.target.value))
                    }
                  />
                ) : (
                  getTotalWeight(
                    value == "hardener" ? inputHardener : inputResin,
                    value,
                    coef
                  )
                )}
              </>
            </Container>
            <Container>
              <>
                <Radio value="resin" label="Resin" />
                {value == "resin" ? (
                  <Input
                    type={"number"}
                    placeholder="Resin in weight (in grams)"
                    onChange={(evt) => setInputResin(Number(evt.target.value))}
                  />
                ) : (
                  getResin(
                    value == "totalWeight" ? inputTotalWeight : inputHardener,
                    value,
                    coef
                  )
                )}
              </>
            </Container>
            <Container>
              <>
                <Radio value="hardener" label="Hardener" />
                {value == "hardener" ? (
                  <Input
                    type={"number"}
                    placeholder="Hardener in weight (in grams)"
                    onChange={(evt) =>
                      setInputHardener(Number(evt.target.value))
                    }
                  />
                ) : (
                  getHardener(
                    value == "totalWeight" ? inputTotalWeight : inputResin,
                    value,
                    coef
                  )
                )}
              </>
            </Container>
          </Radio.Group>
        </Container>
      </Card>
    </Container>
  );
}

export default App;
