import http from '@/server';
const baseApi = '/api/CommandCenter';

export function getLocation() {
    return http.get(`${baseApi}?optionType=location`);
}

/**
 * 防抗台人员调配
 */
export function getDefendTyphoon() {
    return http.get(`${baseApi}?optionType=DefendTyphoon`);
}

/**
 * 获取航速
 */
export function getSpeed() {
    return http.get(`${baseApi}?optionType=Speed`);
}

/**
 * 获取潮汐
 */
export function getTide() {
    return http.get(`${baseApi}?optionType=tide`);
}

/**
 * 获取锚点详情
 * @param {string} id 
 */
export function getAnchorDetail(id) {
    return http.get(`${baseApi}?optionType=PointDetail&Type=1&PonitId=${id}`);
}

/**
* 获取船只详情
* @param {string} id 
*/
export function getShipDetail(id) {
    return http.get(`${baseApi}?optionType=PointDetail&Type=2&PonitId=${id}`);
}

/**
* 获取监控详情
* @param {string} id 
*/
export function getMonitorDetail(id) {
    return http.get(`${baseApi}?optionType=PointDetail&Type=3&PonitId=${id}`);
}

/**
* 获取外厂船舶列表
*/
export function getOutShips() {
    return http.get(`${baseApi}?optionType=DockingShipyard`);
}

/**
 * 获取防抗台列表 
 * @param {string} id 
 */
export function getTyphoonPlan(id) {
    return http.get(`${baseApi}?optionType=TyphoonPlan&id=${id}`);
}

/**
* 获取防抗台预案选项列表
*/
export function getTyphoonPlanName() {
    return http.get(`${baseApi}?optionType=TyphoonPlanName`);
}