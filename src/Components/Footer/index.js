import * as React from "react";
import styles from "./style.module.css";
import Logo from "../Logo";
import { Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="sectionInner">
        <div className={styles.footer_wrapper}>
          <Logo />
          <div className={styles.button_wrapper}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link
                className={styles.footer_button_wrapper_btn}
                href="https://github.com/AvanovaMaria"
                sx={{ mr: "10px" }}
              >
                <IconButton color="secondary" aria-label="add an alarm">
                  <GitHubIcon /> Мария Аванова
                </IconButton>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link
                className={styles.footer_button_wrapper_btn}
                href="https://github.com/sopel1996"
                sx={{ mr: "10px" }}
              >
                <IconButton color="primary" aria-label="add an alarm">
                  <GitHubIcon /> Сергей Сапелко
                </IconButton>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link
                className={styles.footer_button_wrapper_btn}
                href="https://github.com/tatiana-lee"
                sx={{ mr: "10px" }}
              >
                <IconButton color="secondary" aria-label="add an alarm">
                  <GitHubIcon /> Татьяна Ли
                </IconButton>
              </Link>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
