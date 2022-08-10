import { Avatar, Grid } from "@nextui-org/react";

export default function Board() {
  return (
    <div>
      <Grid.Container gap={2}>
        <Grid>
          <h3>Current Board Of Directors</h3>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2}>
        <Grid>
          <Avatar
            squared
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </Grid>
        <Grid>
          <Avatar squared text="Jon" />
        </Grid>
        <Grid>
          <Avatar
            squared
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </Grid>
        <Grid>
          <Avatar squared text="Jane" />
        </Grid>
        <Grid>
          <Avatar
            squared
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </Grid>
        <Grid>
          <Avatar squared text="Kelly" />
        </Grid>
      </Grid.Container>
    </div>
  );
}
