use clap::{App, Arg, ArgMatches};

pub fn build_cli() -> ArgMatches<'static> {
    App::new(crate_name!())
        .version(crate_version!())
        .author(crate_authors!())
        .about(crate_description!())
        .arg(
            Arg::from_usage(
                "<args>... 'Repository and target tag or branch.\nex: tricot-inc/changelog <tag>'",
            )
            .required(true)
            .multiple(true),
        )
        .arg(
            Arg::from_usage("<token> 'GitHub Token'")
                .short("t")
                .long("token")
                .required(false)
                .takes_value(true),
        )
        .get_matches()
}
