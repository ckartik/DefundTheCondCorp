import React from "react";
import { Typography } from "antd";
import { Button, Grid, GridContainer } from "@nextui-org/react";

const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  return (
    <div style={{ display: "flex", justifyContent: "right", alignItems: "right", padding: "1.2rem" }}>
      <h1>DefundTheCondCorp</h1>
      
      <div style={{ display: "flex", justifyContent: "right", flexDirection: "row", flex: 1, alignItems: "start" }}>
        
        <Grid.Container gap={3}>
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
          {props.children}
          </Grid>

        </Grid.Container>
      
      </div>
    </div>
   
  );
}

Header.defaultProps = {
  link: "",
  title: "",
  subTitle: "",
};
