import { adStatus } from 'Constants/adStatus';

export const __TRACK_SELECT_FROM_STORAGE_NAME = 'trackSelectFrom';
 /** Return an object with commons params to track in seller actions
  * @param {object} itemStatus:
  * {
  *     @param {string} status
  *     @param {bool} allow_edit
  * }
  * @param {string} origin
  * @param {string} flowType
  */
export const getMyAdTrackInfo = (itemStatus, params) => {
    const { status, allow_edit } = itemStatus;
    let trackStatus = status;

    if (status === adStatus.MODERATED) {
        trackStatus = allow_edit ? 'moderated_soft' : 'moderated_hard';
    }

    return itemStatus ? {
        item_status: trackStatus,
        ...params
    } : {};
};

const getItemStatus = item => {
    let status = 'normal';

    if (item.hot) {
        status = 'hot';
    }
    else if (item.new) {
        status = 'new';
    }
    return status;
};

export const getFavouriteItemInfo = item => {
    return item ? {
        item_id: item.id,
        seller_id: item.user_id,
        item_status: getItemStatus(item.status.flags),
        images_count: item.images.length,
        creation_date: item.created_at,
        category_id: item.category_id,
        price: (item.price && item.price.value) ? item.price.value.raw : ''
    } : {};
};

export const getLoadAbandonmentTrackingHeader = (environment, device) => {
    const HYDRA_ORIGIN = (environment === 'production') ? 'https://tracking.olx-st.com' : 'https://tracking-dev.onap.io';
    const HYDRA_STREAM = 'p-olx-abandon';

    return `
    <script type="text/javascript">
        function trackAbandonment() {
            document.removeEventListener('visibilitychange', trackAbandonment);
            var HYDRA_URL = '${HYDRA_ORIGIN}/h/${HYDRA_STREAM}';
            var event = [
                "abandon_time=" + Math.round(performance.now()),
                "device=${device}",
                "host=" + encodeURIComponent(location.hostname),
                "path=" + encodeURIComponent(location.pathname),
                "referrer=" + encodeURIComponent(document.referrer)
            ].join('&');
            var data = JSON.stringify({
                tracks: [event]
            });
            var sent = navigator.sendBeacon && navigator.sendBeacon(HYDRA_URL, data);
        };
        document.addEventListener('visibilitychange', trackAbandonment);
        window.addEventListener('load', function(event) {
            document.removeEventListener('visibilitychange', trackAbandonment);
        });
    </script>
`;
};

/**
 * https://github.com/GoogleChromeLabs/first-input-delay/blob/master/dist/first-input-delay.min.js
 */
export const getFirstInputDelayTrackingHeader = () => {
    return `
    <script type="text/javascript">
        !function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);

        perfMetrics.onFirstInputDelay(function(delay, event) {
            window.fid = {
                delay: delay,
                event: event
            }
        });
    </script>
`;
};

export const setSelectFrom = origin => {
    switch (origin) {
        case 'browser':
        case 'search':
            return 'resultpage';
        default:
            return origin;
    }
};
