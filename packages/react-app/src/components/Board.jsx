import React from "react";
// import { Button } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Avatar } from "@nextui-org/react";
import { Button, Grid, GridContainer } from "@nextui-org/react";

export default function Board() {
  return (
    <div>
      <Grid.Container gap={2}>
        <Grid>
          <h3>Current Board Of Directors</h3>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={5}>
        <Grid>
          <Avatar squared size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Button bordered color="error" auto>
            Vote Remove
          </Button>
        </Grid>

        <Grid>
          <Avatar squared size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Button bordered color="error" auto>
            Vote Remove
          </Button>
        </Grid>

        <Grid>
          <Avatar squared size="lg" src="https://i.pravatar.cc/150?u=a04258114429026702d" />
          <Button bordered color="error" auto>
            Vote Remove
          </Button>
        </Grid>
      </Grid.Container>
    </div>
  );
}
