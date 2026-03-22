
import { Card, Grid, Skeleton } from "@luxis-ui/react";
import "../team.layout.css";

export default function TeamMembersSkeleton() {
  return (
    <section className="team-page">
      {/* Metric cards */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Grid>
        ))}
      </Grid>

      {/* Panels */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            variant="outlined"
            header={<Skeleton variant="text" width="35%" height={28} animation="wave" />}
            divider
            className="team-page__panel"
          >
            <div className="team-page__panel-body">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  height={48}
                  animation="wave"
                  style={{ marginBottom: 4 }}
                />
              ))}
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            header={<Skeleton variant="text" width="50%" height={28} animation="wave" />}
            divider
            className="team-page__panel"
          >
            <div className="team-page__panel-body team-page__chart-placeholder">
              <Skeleton variant="rectangular" height={260} animation="wave" />
            </div>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
}
