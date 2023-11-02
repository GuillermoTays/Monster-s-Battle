import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { colors } from "../../constants/colors";

export const BattleResult = styled(Box)(() => ({
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '22px',
    color: colors.black,
    lineHeight: '42px',
    background: colors.lightBlue,
    border: `1px solid ${colors.black}`,
    borderRadius: '4px',
    boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
    padding: '8px 20px'
}))