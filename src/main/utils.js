class Utils
{
    constructor()
    {

    }
    isDev()
    {
        return process.mainModule.filename.indexOf('app.asar') === -1;
    }
}
export default new Utils();