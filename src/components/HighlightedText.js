import React from 'react';
import Typography from '@material-ui/core/Typography';

import { colors } from '../settings/theme';

export default function HighlightedText(props) {
    const {
        text,
        highlightedSubString,
    } = props;

    const highlightStartIndex = text.toLowerCase().indexOf(highlightedSubString.toLowerCase());

    if (highlightStartIndex === -1) {
        throw new Error(`Substring ${highlightedSubString} does not exist in ${text}`);
    }

    const highlightEndIndex = highlightStartIndex + highlightedSubString.length;

    const beforeHighlight = text.slice(0, highlightStartIndex);
    const highlight = text.slice(highlightStartIndex, highlightEndIndex);
    const afterHighlight = text.slice(highlightEndIndex);

    return (
        <Typography>
            <span>{beforeHighlight}</span>
            <span
                style={{
                    fontWeight: 'bold',
                    color: colors.primary,
                }}
            >
                {highlight}
            </span>
            <span>{afterHighlight}</span>
        </Typography>
    )

}