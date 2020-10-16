import './block/select-block/block';
import './block/multipurpose-gutenberg-block/block';
import './block/separator/block';
import './block/button/block';
import './block/accordion/block';
import './block/layout/block';
import './block/Heading/block';
import './block/image/block';
import './block/media-with-text/block';
import './block/column/block';
import './block/list/block';
import './block/slider/block';
import './block/social-links/block';
import './block/tabbing/block';
import './block/gallery/block';
import './block/counter/block';
import './block/Icons/block';
import './block/popup/block';
import './block/countdown/block';

(function () {
  const bricksIcon = (
    <svg
      x="0px"
      y="0px"
      width="25.2px"
      height="26.409px"
      viewBox="0 0 215.5 186.3"
      enableBackground="new 0 0 215.5 186.3"
  >
    <g>
      <g>
        <g>
          <polygon
            fill="#B6BFCD"
            className="st0"
            points="173,137.2 107.8,99 107.8,49 173,87.4"
          />
          <polygon
            fill="#96A0AE"
            className="st1"
            points="173,137.2 215.5,111.5 215.5,62.4 173,87.4"
          />
          <polygon
            fill="#D0D7E2"
            className="st2"
            points="215.5,62.4 150.3,24.1 107.8,49 173,87.4"
          />
        </g>
        <g>
          <polygon
            fill="#B6BFCD"
            className="st0"
            points="65.2,123 0,84.7 0,35.7 65.2,74"
          />
          <polygon
            fill="#96A0AE"
            className="st1"
            points="65.2,123.9 107.8,99 107.8,49.1 65.2,74"
          />
          <polygon
            fill="#D0D7E2"
            className="st2"
            points="107.8,49.1 42.6,10.7 0,35.7 65.2,74"
          />
        </g>
        <g>
          <polygon
            fill="#B6BFCD"
            className="st0"
            points="87.9,186.3 22.7,147.9 22.7,98.9 87.9,137.2"
          />
          <polygon
            fill="#96A0AE"
            className="st1"
            points="87.9,186.3 130.4,161.3 130.4,112.3 87.9,137.2"
          />
          <polygon
            fill="#D0D7E2"
            className="st2"
            points="130.4,112.3 65.2,74 22.7,98.9 87.9,137.2"
          />
        </g>
      </g>
      <g>
        <polygon
          fill="#F05623"
          className="st3"
          points="130.4,112.3 65.2,74 65.2,24.9 130.4,63.2 		"
        />
        <polygon
          fill="#DB4026"
          className="st4"
          points="130.4,113.2 173,88.2 173,38.3 130.4,63.2 		"
        />
        <polygon
          fill="#F39265"
          className="st5"
          points="173,38.3 107.8,0 65.2,24.9 130.4,63.2 		"
        />
      </g>
    </g>
  </svg>
  );
  wp.blocks.updateCategory('bricksblocks', { icon: bricksIcon });
})();
