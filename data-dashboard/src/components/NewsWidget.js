import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function NewsWidget({ data }) {
  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 150,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No news available at the moment.
        </Typography>
      </Paper>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 2, bgcolor: "#1976d2", color: "white" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Latest News
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {data.map((article, index) => (
          <React.Fragment key={index}>
            <ListItem
              alignItems="flex-start"
              button
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                p: 2,
                transition: "background-color 0.3s, transform 0.2s",
                "&:hover": {
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={article.source.name}
                  src={article.urlToImage}
                  variant="rounded"
                  sx={{ width: 85, height: 85, borderRadius: 2 }}
                >
                  <ArticleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      ml: 1,
                      fontWeight: "bold",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {article.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ ml: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Chip
                        size="small"
                        label={article.source.name}
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1, height: 22, fontSize: "0.75rem" }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon
                          sx={{
                            fontSize: 16,
                            mr: 0.5,
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(article.publishedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {article.description || "Read full article..."}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < data.length - 1 && <Divider sx={{ mx: 2 }} />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default NewsWidget;
