import React from "react";
import { Button, Grid } from "@nextui-org/react";
import Board from "./Board";
import Votingissues from "./votingissues";
import Pagi from "./pagi";

export default function App() {
  return (
    <div>
      <h1>DefundTheCondCorp</h1>
      <Grid.Container gap={2}>
        <Grid>
          <Button color="gradient" auto ghost>
            Home
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto ghost>
            Dashboard
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto ghost>
            Notices
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto ghost>
            Voting
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto ghost>
            Profile
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" auto ghost>
            Settings
          </Button>
        </Grid>
        <Grid>
          <Button color="error" auto ghost>
            Connect Wallet
          </Button>
        </Grid>
        <Grid.Container gap={2}>
          <Grid>
            <Board />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2}>
          <Votingissues />
        </Grid.Container>
        <Grid.Container gap={8}>
          <Pagi />
        </Grid.Container>
      </Grid.Container>
    </div>
  );
}
