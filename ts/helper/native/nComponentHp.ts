export namespace nComponentHp {
    export const createInfrastructureComponentTopProps = <T extends {}>(props: T) => {
        return Object.assign(
            {
                key: undefined,
                ref: undefined
            },
            props
        );
    }
}